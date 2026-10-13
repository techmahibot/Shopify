const crypto = require("crypto");
const mongoose = require("mongoose");
const Customer = require("../models/customer.model");
const Order = require("../models/order.model");
const getRazorpay = require("../config/razorpay");

const ADDRESS_FIELDS = ["fullName", "phone", "addressLine1", "city", "state", "pincode"];

// Returns a clean address object, or an error message string
const validateAddress = (address) => {
    if (!address || typeof address !== "object") {
        return "Shipping address is required";
    }

    const clean = {};

    for (const field of ADDRESS_FIELDS) {
        const value = typeof address[field] === "string" ? address[field].trim() : "";

        if (!value) {
            return `${field} is required`;
        }

        clean[field] = value;
    }

    if (!/^[6-9]\d{9}$/.test(clean.phone)) {
        return "Phone must be a valid 10-digit number";
    }

    if (!/^\d{6}$/.test(clean.pincode)) {
        return "Pincode must contain 6 digits";
    }

    return clean;
};

// 1) Validate the cart, save a PENDING order, create the Razorpay order
const createPaymentOrder = async (req, res) => {
    try {
        // only the address is read from the body; any total or prices sent are ignored
        const address = validateAddress(req.body.shippingAddress);

        if (typeof address === "string") {
            return res.status(400).json({ success: false, message: address });
        }

        // load the cart with the LATEST product data
        const customer = await Customer.findById(req.user._id).populate("cart.product");

        if (!customer.cart.length) {
            return res.status(400).json({ success: false, message: "Your cart is empty" });
        }

        const items = [];
        let totalAmount = 0;

        for (const cartItem of customer.cart) {
            const product = cartItem.product;

            // product deleted after it was added to the cart
            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: "A product in your cart is no longer available. Please remove it."
                });
            }

            if (cartItem.quantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}.`
                });
            }

            items.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: cartItem.quantity,
                image: product.image
            });

            totalAmount += product.price * cartItem.quantity;
        }

        const order = await Order.create({
            user: req.user._id,
            items,
            shippingAddress: address,
            totalAmount
        });

        let razorpayOrder;

        try {
            razorpayOrder = await getRazorpay().orders.create({
                amount: Math.round(totalAmount * 100), // rupees to paise
                currency: "INR",
                receipt: order._id.toString()
            });
        }       catch (error) {
            // the pending order is useless without a payment order
            await Order.deleteOne({ _id: order._id });
            console.error("Razorpay order creation failed:", error.error || error.message);

            // Razorpay rejected our request (for example, amount too large): show its reason
            if (error.statusCode === 400 && error.error?.description) {
                return res.status(400).json({ success: false, message: error.error.description });
            }

            return res.status(502).json({ success: false, message: "Unable to start payment. Please try again." });
        }

        order.razorpayOrderId = razorpayOrder.id;
        await order.save();

        // the cart is NOT touched here
        return res.status(201).json({
            success: true,
            shopKartOrderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID // the Key ID is public, the secret never leaves the server
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// 2) Verify the signature, then mark PAID + PLACED and clear the cart
const verifyPayment = async (req, res) => {
    try {
        const { shopKartOrderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!mongoose.Types.ObjectId.isValid(shopKartOrderId)) {
            return res.status(400).json({ success: false, message: "Invalid order ID" });
        }

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment details are required" });
        }

        const order = await Order.findOne({ _id: shopKartOrderId, user: req.user._id });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // already confirmed (double click or retry): return it again, change nothing
        if (order.paymentStatus === "PAID") {
            return res.status(200).json({ success: true, message: "Order already confirmed", order });
        }

        // the browser's order id must match the one WE saved
        if (order.razorpayOrderId !== razorpay_order_id) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        // signature = HMAC_SHA256(razorpayOrderId + "|" + paymentId, key secret)
        const expected = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(order.razorpayOrderId + "|" + razorpay_payment_id)
            .digest("hex");

        const expectedBuffer = Buffer.from(expected);
        const receivedBuffer = Buffer.from(String(razorpay_signature));

        const valid =
            expectedBuffer.length === receivedBuffer.length &&
            crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

        if (!valid) {
            // order stays PENDING and the cart stays untouched
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        order.paymentStatus = "PAID";
        order.status = "PLACED";
        order.razorpayPaymentId = razorpay_payment_id;
        await order.save();

        await Customer.updateOne({ _id: req.user._id }, { $set: { cart: [] } });

        return res.status(200).json({ success: true, message: "Order placed", order });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// 3) My orders: newest first, only paid ones
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id, paymentStatus: "PAID" }).sort({ createdAt: -1 });

        return res.status(200).json({ success: true, orders });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// 4) One order, only if it belongs to me
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid order ID" });
        }

        // ownership is part of the query, so someone else's id looks exactly like a missing one
        const order = await Order.findOne({ _id: id, user: req.user._id });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, order });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { createPaymentOrder, verifyPayment, getOrders, getOrderById };
