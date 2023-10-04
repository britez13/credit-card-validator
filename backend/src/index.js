const express = require("express")
const dotenv = require("dotenv").config()
const ccValidation = require("./routes/cc-validation")

// Initialize express server
const app = express()

// Config
const PORT = process.env.PORT || 3000

// Middlewares
app.use( express.json() )
app.use("/api/validate-credit-card", ccValidation)

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
})