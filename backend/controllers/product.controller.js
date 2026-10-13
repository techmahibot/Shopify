const mongoose = require("mongoose");
const Product = require("../models/product.model");

// prevents a search string like "a+b" from being treated as regex syntax
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body;

        if (!name || !description || !category || !image || price === undefined || stock === undefined) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (price <= 0) {
            return res.status(400).json({ success: false, message: "Price must be greater than 0" });
        }

        if (stock < 0) {
            return res.status(400).json({ success: false, message: "Stock cannot be negative" });
        }

        const product = await Product.create({ name, description, price, category, image, stock });

        return res.status(201).json({ success: true, product });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message || "Failed to create product" });
    }
};

const getProducts = async (req, res) => {
    try {
        const { search, category, sort } = req.query;

        const query = {};

        if (search) {
            query.name = { $regex: escapeRegex(search), $options: "i" };
        }

        if (category && category !== "All") {
            query.category = category;
        }

        let mongoQuery = Product.find(query);

        if (sort === "price_asc") {
            mongoQuery = mongoQuery.sort({ price: 1 });
        } else if (sort === "price_desc") {
            mongoQuery = mongoQuery.sort({ price: -1 });
        } else {
            mongoQuery = mongoQuery.sort({ createdAt: -1 });
        }

        const products = await mongoQuery;

        return res.status(200).json({ success: true, count: products.length, products });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, product });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { createProduct, getProducts, getProductById };