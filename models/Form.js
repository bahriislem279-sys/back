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
            type: [String],
            required: true,
            enum: ["MDW", "DSI"]
        },
        duree: {
            type: Number,
            required: true
        },
        typeStage: {
            type: [String],
            rquired: true,
            enum: ["perfectionnement", "pfe"]
        },
        message: {
            type: String,

        },
        isApproved: {
            type: Boolean,
            default: false
        }
    }
)
module.exports = mongoose.model("Form", formSchema)