const express = require("express")
const validateCreditCard = require("../controllers/cc-validation")

const router = express.Router()

router.post("/", validateCreditCard)

module.exports = router