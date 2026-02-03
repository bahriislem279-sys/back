const express = require("express");
const mongoose = require("mongoose")
const Form = require("../models/Form")
const router = express.Router()
//get all forms
router.get("/", async (req, res) => {
    try {
        const form = await Form.find();
        return res.status(200).json(form)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" })
    }
})

//get form by id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).json({ message: "Not Found" })
        }
        return res.status(200).json(form)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" })
    }
})
module.exports = {
    formRoutes: router
}

