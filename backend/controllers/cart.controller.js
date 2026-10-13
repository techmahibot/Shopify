const mongoose = require("mongoose");
const Customer = require("../models/customer.model");
const Product = require("../models/product.model");

// Load the cart with the LATEST product data (price and stock are never copied into the cart)
const loadCart = async (customerId) => {
    const customer = await Customer.findById(customerId).populate({
        path: "cart.product",
        select: "name price category image stock"
    });

    // a product deleted from the catalogue populates as null, so skip those rows
    return customer.cart
        .filter((item) => item.product)
        .map((item) => ({ product: item.product, quantity: item.quantity }));
};

const findCartItem = (user, productId) =>
    user.cart.find((item) => item.product.toString() === productId);

const stockMessage = (stock) =>
    stock === 0 ? "Product is out of stock" : `Only ${stock} unit(s) available`;

const addToCart = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const existing = findCartItem(req.user, productId);
        const newQuantity = existing ? existing.quantity + 1 : 1;

        if (newQuantity > product.stock) {
            return res.status(400).json({ success: false, message: stockMessage(product.stock) });
        }

        if (existing) {
            // same product again: increase the quantity, never add a second row
            await Customer.updateOne(
                { _id: req.user._id, "cart.product": product._id },
                { $set: { "cart.$.quantity": newQuantity } }
            );
        } else {
            await Customer.updateOne(
                { _id: req.user._id },
                { $push: { cart: { product: product._id, quantity: 1 } } }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Cart updated",
            cart: await loadCart(req.user._id)
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const getCart = async (req, res) => {
    try {
        return res.status(200).json({ success: true, cart: await loadCart(req.user._id) });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const updateQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        if (typeof quantity !== "number" || !Number.isInteger(quantity)) {
            return res.status(400).json({ success: false, message: "Quantity must be a whole number" });
        }

        if (quantity < 1) {
            return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (!findCartItem(req.user, productId)) {
            return res.status(404).json({ success: false, message: "Product not in cart" });
        }

        if (quantity > product.stock) {
            return res.status(400).json({ success: false, message: stockMessage(product.stock) });
        }

        await Customer.updateOne(
            { _id: req.user._id, "cart.product": product._id },
            { $set: { "cart.$.quantity": quantity } }
        );

        return res.status(200).json({
            success: true,
            message: "Cart updated",
            cart: await loadCart(req.user._id)
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        if (!findCartItem(req.user, productId)) {
            return res.status(404).json({ success: false, message: "Product not in cart" });
        }

        await Customer.updateOne(
            { _id: req.user._id },
            { $pull: { cart: { product: productId } } }
        );

        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart: await loadCart(req.user._id)
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { addToCart, getCart, updateQuantity, removeFromCart };