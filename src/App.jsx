import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to,setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangerate, setExchangerate] = useState(null);

  
  useEffect(() => {
    const exchangerate = async () => {
      try {
        let url=` https://v6.exchangerate-api.com/v6/8817cb408361713fc96c00e7/latest/${from}`;
      
        const res = await axios.get(url)
        setExchangerate(res.data.rates[to]);
      } catch (error) {
        console.error("Error fetching exchange rate", error);
      }
    }
    exchangerate();
  }, [from, to]);

  useEffect(() => {
    if (exchangerate !== null) {
      setConvertedAmount((amount * exchangerate).toFixed(2));}
    }, [amount, exchangerate]);

  const handleamt = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };
  const handlefromcurrency = (e) => {
    setFrom(e.target.value);
  };
 
  const handletocurrency = (e) => {
    setTo(e.target.value);
  };
 
  return (
    <>
      <div className='container'>
      <div className="currency">
        <h1>Currency Converter</h1>
      </div>
      <div className="in-tag">
        <label htmlFor="amt">Amount</label>
        <input type="number" value={amount} onChange={handleamt}/>
      </div>
      <div className="from">
        <label htmlFor="frm" value={from} onChange={handlefromcurrency}>From currency</label>
        <select name="" id="frm">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
        <option value="AUD">AUD</option>
        <option value="CAD">CAD</option>
        <option value="CNY">CNY</option>
        <option value="INR">INR</option>
        <option value="BRL">BRL</option>
        <option value="ZAR">ZAR</option>
        </select>
      </div>
      <div className="too">
        <label htmlFor="to" value={to} onChange={handletocurrency}>To curr</label>
        <select name="" id="to">
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
        <option value="AUD">AUD</option>
        <option value="CAD">CAD</option>
        <option value="CNY">CNY</option>
        <option value="BRL">BRL</option>
        <option value="ZAR">ZAR</option>
        </select>
      </div>
      <div className="result">
        <p>{amount} {from} is equal to {convertedAmount} {to} </p>
      </div>
      </div>
     
    </>
  )
}

export default App
