const dns = require('dns');  // 👈 Add this first
dns.setServers(["1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { formRoutes } = require("./routes/formRoutes");

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());

// START SERVER FUNCTION
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO); // 👈 بدون أي options
        console.log("✅ Connected Successfully");
        app.listen(port, () => {
            console.log(`App running on port ${port}`);
        });
    } catch (error) {
        console.log("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

startServer();
app.use("/api", formRoutes);