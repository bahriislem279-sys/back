const express = require("express");
const mongoose = require("mongoose");
const Form = require("../models/Form");
const router = express.Router();
const requireAuth = require("../middleware/requiredAuth");
const requireRole = require("../middleware/requireRole");
//get all forms
router.get("/", async (req, res) => {
  try {
    const form = await Form.find();
    return res.status(200).json(form);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

//get form by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(form);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});


// CREATE new form
router.post("/", async (req, res) => {
  const {
    nom,
    prenom,
    email,
    specialite,
    duree,
    typeStage,
    message,
  } = req.body;

  // basic validation
  if (!nom || !prenom || !email || !specialite || !duree || !typeStage) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const form = await Form.create({
      nom,
      prenom,
      email,
      specialite,
      duree,
      typeStage,
      message,
      // status defaults to "en attend"
    });

    return res.status(201).json({
      message: "Form submitted successfully",
      form,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});


router.patch(
  "/:id/status",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    try {
      const updatedForm = await Form.findByIdAndUpdate(
        id,
        { status }, // ✅ ONLY status can be updated
        { new: true },
      );

      if (!updatedForm) {
        return res.status(404).json({ message: "Not Found" });
      }

      return res.status(200).json({
        message: "Form status updated successfully",
        form: updatedForm,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
);
module.exports = {
  formRoutes: router,
};
