const statusCode = require("../utils/statusCodes");

function validateCreditCard(req, res) {
  const { cardNumber, cvv, date } = req.body;

  try {
    validateDate(date);
    validateCVV(cvv, cardNumber);
    validateCardNumber(cardNumber);

    res.status(statusCode.OK).json("Valid credit card.");
  } catch (error) {
    console.log(error.message);
    res.status(statusCode.BAD_REQUEST).json(error.message);
  }
}

function validateDate(date) {
  const receivedDate = new Date(date);
  const currentDate = new Date();

  if (receivedDate <= currentDate) {
    throw new Error("Credit card expired.");
  }
}

function validateCVV(cvv, cardNumber) {
  if (! (cvv.length === 3 || cvv.length === 4)) {
    throw new Error("Incorrect CVV.");
  }

  if( cvv.length === 3 && (cardNumber.startsWith("34") || cardNumber.startsWith("37"))){ 
    throw new Error("Incorrect CVV for American Express.");
  }

  if(( !(cardNumber.startsWith("34") || cardNumber.startsWith("37"))) && cvv.length === 4) {
    throw new Error("Card number isn't valid for American Express.");
  }

}

function validateCardNumber(cardNumber) {
  if (!(cardNumber.length >= 16 && cardNumber.length <= 19)) {
    throw new Error("Incorrect card number.");
  }

  // Test CC against Luhn's algorithm
  let sum = 0;
  let isSecond = true
  for(let i = cardNumber.length - 2; i >= 0; i--) {
    if(isSecond) {
        let doubledNumber = cardNumber[i] * 2;
        sum += doubledNumber > 9 ? doubledNumber - 9 : doubledNumber 
    }
    else {
        sum += cardNumber[i]
    }
    isSecond = !isSecond
  }

  if(!(10 - (sum % 10)) === cardNumber[cardNumber.length - 1] ) {
    throw new Error("Incorrect card number.");
  }

}

module.exports = validateCreditCard;
