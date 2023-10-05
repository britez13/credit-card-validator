const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const ccValidation = require("./routes/cc-validation")

// Initialize express server
const app = express()

// Config 
const PORT = process.env.PORT || 3000
const allowedOrigin = 'http://localhost:5173';
const corsOptions = {
  origin: allowedOrigin,
  optionsSuccessStatus: 200, 
};

/* Middlewares */
// Cors
app.use(cors(corsOptions))

// Json parser
app.use( express.json() )

// Endpoint
app.use("/api/validate-credit-card", ccValidation)

// Listen to port
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
})