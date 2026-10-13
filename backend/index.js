const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const customerRoutes = require("./routes/customer.routes");
const productRoutes = require("./routes/product.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

// CLIENT_URL can hold one or more frontend origins, comma separated
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((url) => url.trim().replace(/\/$/, ""));

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Serverless-friendly: reuse one MongoDB connection across requests
let connection = null;

const connectDB = () => {
    if (!connection) {
        connection = mongoose.connect(process.env.MONGO_URI).catch((error) => {
            connection = null; // allow a retry on the next request
            throw error;
        });
    }
    return connection;
};

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        res.status(503).json({ success: false, message: "Database unavailable" });
    }
});

app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes); 
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Vercel imports the app; running `node index.js` locally starts a normal server
if (require.main === module) {
    const PORT = process.env.PORT || 5001;

    connectDB()
        .then(() => {
            console.log("MongoDB connected");
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        })
        .catch(() => {});
}

module.exports = app;
