const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const { formRoutes } = require("./routes/formRoutes")

const app = express()
app.use(cors());
const port = process.env.PORT || 5000
app.use(express.json())
//START SERVER FUNCTION
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected Succesfully");
        app.listen(process.env.PORT, () => {
            console.log(`App running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

startServer()
app.use("/api", formRoutes)