import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(1);
  const [froms, setFroms] = useState("USD");
  const [to,setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangerate, setExchangerate] = useState(null);

  
  useEffect(() => {
    const exchangerate = async () => {
   try {
        let url=` https://api.exchangerate-api.com/v4/latest/${froms}`;
        const response =await axios.get(url)
        setExchangerate(response.data.rates[to])
      } catch (error) {
        console.error("Error fetching exchange rate", error)
     }
  }
    exchangerate();
  }, [froms, to]);
 

  useEffect(() => {
    if (exchangerate !== null) {
      setConvertedAmount((amount * exchangerate).toFixed(2));}
   }, [amount, exchangerate]);

  const handleamt = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };
  const handlefromcurrency = (e) => {
    setFroms(e.target.value);
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
        <label htmlFor="frm" value={froms} onChange={handlefromcurrency}>From currency</label>
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
        <label htmlFor="tooo" value={to} onChange={handletocurrency}>To currency</label>
        <select name="" id="to00">
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
        <p>{amount} {froms} is equal to {convertedAmount} {to} </p>
      </div>
      <div className="design">Desinged by <span>THINESH</span></div>
      </div>
     
    </>
  )
}

export default App
