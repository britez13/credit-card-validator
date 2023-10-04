const express = require("express")
const dotenv = require("dotenv").config()
const ccValidation = require("./routes/cc-validation")

// Initialize express server
const app = express()

// Config port
const PORT = process.env.PORT || 3000


// Json parser
app.use( express.json() )

// Endpoint
app.use("/api/validate-credit-card", ccValidation)


app.listen(PORT, () => {
    console.log("Server running on port", PORT);
})