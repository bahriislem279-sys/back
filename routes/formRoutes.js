const express = require("express");
const mongoose = require("mongoose")
const Form = require("../models/Form")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const form = await Form.find();
        return res.status(200).json(form)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" })
    }
})
module.exports = {
    formRoutes: router
}

