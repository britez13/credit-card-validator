const statusCode = require("../utils/statusCodes");

function validateCreditCard(req, res) {
  const { cardNumber, cvv, date } = req.body;

  try {

    const numberRegex = /^[0-9]+$/
    
    if(numberRegex.test(cardNumber)== false || numberRegex.test(cvv) == false ) {
      throw new Error("Invalid card number or CVV format.");
    }

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
    throw new Error("Invalid CVV.");
  }

  if( cvv.length === 3 && (cardNumber.startsWith("34") || cardNumber.startsWith("37"))){ 
    throw new Error("Invalid CVV for American Express.");
  }

  if(( !(cardNumber.startsWith("34") || cardNumber.startsWith("37"))) && cvv.length === 4) {
    throw new Error("Invalid card number for American Express.");
  }

}

function validateCardNumber(cardNumber) {
  if (!(cardNumber.length >= 16 && cardNumber.length <= 19)) {
    throw new Error("Invalid card number.");
  }

  // Test CC against Luhn's algorithm
  let sum = 0;
  let isSecond = true
  for(let i = cardNumber.length - 2; i >= 0; i--) {
    if(isSecond) {
        let doubledNumber = parseInt(cardNumber[i]) * 2;
        sum += doubledNumber > 9 ? doubledNumber - 9 : doubledNumber 
    }
    else {
        sum += parseInt(cardNumber[i])
    }
    isSecond = !isSecond
  }

  const calculatedCheckDigit = 10 - (sum % 10)

  if(! (calculatedCheckDigit === parseInt(cardNumber[cardNumber.length - 1])) ) {
    throw new Error("Invalid card number.");
  }

}

module.exports = validateCreditCard;
