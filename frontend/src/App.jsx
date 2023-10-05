import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    month: "",
    year: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    if (
      formData.cardNumber === "" ||
      formData.month === "" ||
      formData.year === "" ||
      formData.cvv === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {      
      const expirationDate = new Date(parseInt(formData.year), parseInt(formData.month), 1);

      const response = await fetch(
        "http://localhost:3000/api/validate-credit-card",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardNumber: formData.cardNumber,
            date: expirationDate.toISOString(),
            cvv: formData.cvv,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="wrapper">
        <div className="card card1">
          <h1>Credit Card</h1>
          <div className="input">
            <label htmlFor="card">Card Number</label>
            <input
              type="number"
              name="cardNumber"
              id="cardNumber"
              onChange={handleChange}
              value={formData.cardNumber}
            />
          </div>
          <div className="input">
            <label htmlFor="date">Exp. Date</label>
            <div className="select">
              <select onChange={handleChange} name="month" id="date">
                <option value="0">01</option>
                <option value="1">02</option>
                <option value="2">03</option>
                <option value="3">04</option>
                <option value="4">05</option>
                <option value="5">06</option>
                <option value="6">07</option>
                <option value="7">08</option>
                <option value="8">09</option>
                <option value="9">10</option>
                <option value="10">11</option>
                <option value="11">12</option>
              </select>
              <span> / </span>
              <select onChange={handleChange} name="year" id="select2">
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card card2">
          <div className="stripe"></div>
          <div className="box">
            <label htmlFor="cvv">CVV</label>
            <div>
              <span>XXXXXXX</span>
              <input
                type="number"
                name="cvv"
                id="cvv"
                onChange={handleChange}
                value={formData.cvv}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="btn-box">
        <button>Check</button>
      </div>
    </form>
  );
}

export default App;
