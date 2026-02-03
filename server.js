const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

const router = express.Router()
app.listen(5000, () => console.log("Server running"));

router.get("/test", async (req, res) => {
    return res.send("Test")
})

app.use(router)