import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({
    cardNumber: "",
    date: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/validate-credit-card",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const data = await response.json();
    } catch (error) {
      alert(error.message);
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
              value={data.cardNumber}
            />
          </div>
          <div className="input">
            <label htmlFor="date">Exp. Date</label>
            <div className="select">
            <select name="month" id="date">
              <option value="01">01</option>
              <option value="01">02</option>
              <option value="01">03</option>
              <option value="01">04</option>
              <option value="01">05</option>
              <option value="01">06</option>
              <option value="01">07</option>
              <option value="01">08</option>
              <option value="01">09</option>
              <option value="01">10</option>
              <option value="01">11</option>
              <option value="01">12</option>
            </select>
            <span> / </span>
            <select name="year" id="">
              <option value="01">23</option>
              <option value="01">24</option>
              <option value="01">25</option>
              <option value="01">26</option>
              <option value="01">27</option>
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
                value={data.cvv}
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
