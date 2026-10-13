const express = require("express");

const {
    registerCustomer,
    loginCustomer,
    getProfile,
    logoutCustomer
} = require("../controllers/customer.controller");

const protect = require("../middlewares/auth.middleware");



const router = express.Router();

router.post("/register", registerCustomer);

router.post("/login", loginCustomer);

router.get("/me", protect, getProfile);

router.post("/logout", protect, logoutCustomer);

module.exports = router;