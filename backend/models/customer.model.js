const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1, min: 1 }
    },
    { _id: false }
);

const customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },
        cart: {
        type: [cartItemSchema],
        default: []
    },

        wishlist: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        default: []
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});



const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;