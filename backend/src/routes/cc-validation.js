const express = require("express")
const validateCreditCard = require("../controllers/cc-validation")

const router = express.Router()

router.get("/", validateCreditCard)

module.exports = router