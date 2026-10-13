const mongoose = require("mongoose");
const Customer = require("../models/customer.model");
const Product = require("../models/product.model");

const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const alreadySaved = req.user.wishlist.some((id) => id.toString() === productId);

        if (alreadySaved) {
            return res.status(409).json({ success: false, message: "Product already in wishlist" });
        }

        // $addToSet = atomic add that can never create a duplicate
        await Customer.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: product._id } });

        return res.status(201).json({ success: true, message: "Product added to wishlist" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const getWishlist = async (req, res) => {
    try {
        const customer = await Customer.findById(req.user._id).populate({
            path: "wishlist",
            select: "name price category image stock"
        });

        return res.status(200).json({
            success: true,
            count: customer.wishlist.length,
            wishlist: customer.wishlist
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const inWishlist = req.user.wishlist.some((id) => id.toString() === productId);

        if (!inWishlist) {
            return res.status(404).json({ success: false, message: "Product not in wishlist" });
        }

        await Customer.findByIdAndUpdate(req.user._id, { $pull: { wishlist: productId } });

        return res.status(200).json({ success: true, message: "Product removed from wishlist" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist };