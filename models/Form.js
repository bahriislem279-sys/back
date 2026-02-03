const mongoose = require("mongoose")
const formSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        specialite: {
            type: String,
            required: true,
            enum: ["MDW", "DSI"]
        },
        duree: {
            type: Number,
            required: true
        },
        typeStage: {
            type: String,
            required: true,
            enum: ["perfectionnement", "pfe"]
        },
        message: {
            type: String,

        },
        status: {
            type: String,
            default: "en attend",
            enum: ["en attend", "refus", "accepte"]
        }
    }
)
module.exports = mongoose.model("Form", formSchema)