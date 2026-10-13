const Razorpay = require("razorpay");

let client = null;

// Created on first use, so the server still starts if the keys are missing
const getRazorpay = () => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay keys are not configured");
    }

    if (!client) {
        client = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
    }

    return client;
};

module.exports = getRazorpay;
