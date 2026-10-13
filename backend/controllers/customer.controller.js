const bcrypt = require("bcrypt");
const Customer = require("../models/customer.model");
const generateToken = require("../utils/generateToken");

// Frontend and API share one domain on Vercel (API under /api), so Lax works.
// Secure is only switched on in production because local dev runs on http.
const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax"
};

const registerCustomer = async (req, res) => {
    try {
        const { fullName, email, password, phone } = req.body;

        if (!fullName || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 6 characters"
            });
        }

        const existingCustomer = await Customer.findOne({ email });

        if (existingCustomer) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const customer = await Customer.create({
            fullName,
            email,
            password: hashedPassword,
            phone
        });

        return res.status(201).json({
            success: true,
            message: "Customer registered successfully",
            customer: {
                _id: customer._id,
                fullName: customer.fullName,
                email: customer.email,
                phone: customer.phone
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            customer.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(customer._id);

        res.cookie("token", token, {
            ...cookieOptions,
            maxAge: 24 * 60 * 60 * 1000 // matches the 1 day token expiry
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            customer: {
                _id: customer._id,
                fullName: customer.fullName,
                email: customer.email,
                phone: customer.phone
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



const getProfile = async (req, res) => {
    return res.status(200).json({
        success: true,
        customer: req.user
    });
};


const logoutCustomer = (req, res) => {
    res.clearCookie("token", cookieOptions);

    return res.status(200).json({
        success: true,
        message: "Logout successful"
    });
};

module.exports = {
    registerCustomer,
    loginCustomer,
    getProfile,
    logoutCustomer
};