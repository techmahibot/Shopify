const express = require("express");

const {
    createPaymentOrder,
    verifyPayment,
    getOrders,
    getOrderById
} = require("../controllers/order.controller");

const protect = require("../middlewares/auth.middleware");

const router = express.Router();

// every order route needs a logged-in customer
router.use(protect);

router.post("/create-payment-order", createPaymentOrder);
router.post("/verify-payment", verifyPayment);
router.get("/", getOrders);
router.get("/:id", getOrderById);

module.exports = router;
