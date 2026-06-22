import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/btn.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons"; 
import { countries } from "./country.js";

function App() {

  const [amount, setAmount] = useState(100);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("INR");
  const [code1, setCode1] = useState("US");
  const [code2, setCode2] = useState("IN");
  const [exchangeAmount, setExchangeAmount] = useState("Loading...");
  const [total, setTotal] = useState("Loading...");

  const getExchange = async () => {
    try {
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${currency1}`,
      );
      const data = await response.json();
      const rate = data.rates[currency2];
      setExchangeAmount(rate);
      setTotal(rate * amount);
    } catch (error) {
      console.log(error);
    }
  };

  const resetValue = async () => {
    setAmount(100);
    setCurrency1("USD");
    setCurrency2("INR");
    setCode1("US");
    setCode2("IN");
    getExchange();
  };

  const arr = [
    {name : "Exchange", action : getExchange},
    {name : "Reset", action : resetValue}
  ];

  useEffect(() => {
    getExchange();
  }, [currency1, currency2, code1, code2, amount]);

  function revertAll() {
    const tempCode = code1;
    setCode1(code2);
    setCode2(tempCode);
    const tempCurr = currency1;
    setCurrency1(currency2);
    setCurrency2(tempCurr);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl text-purple-600 p-10">
        Currency Converter
      </h1>
      <div className="bg-black p-12 rounded-lg flex flex-col justify-center items-center">
        <div className="flex flex-row gap-2">
          <h1 className="text-white">Amount : </h1>
          <input
            type="text"
            value={amount}
            className="bg-white rounded-md pl-2"
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setAmount(value);
              }
            }}
          />
        </div>

        <div className="flex justify-center items-center text-white mt-10 mb-10 gap-15 ">
          
          <div>
            <img src={`https://flagsapi.com/${code1}/flat/64.png`} alt="Country Flag" />
            <select value={code1} onChange={(e) => {
              const code = e.target.value;
              setCode1(code);

              const country = countries.find((item) => item.code === code);
              setCurrency1(country.currency);
              }
            } className="bg-teal-600 mt-5 rounded-lg pl-1 text-lg">
              {
                countries.map((country, idx) => {
                  return (
                    <option key={idx} className="text-black">{country.code}</option>
                  );
                })
              }
            </select>
          </div>

          <h1 className="cursor-pointer" onClick={revertAll}>
            <FontAwesomeIcon icon={ faRightLeft } size="2x" />
          </h1>

          <div>
            <img src={`https://flagsapi.com/${code2}/flat/64.png`} alt="Country Flag" />
            <select value={code2} onChange = {(e) => {
              const code = e.target.value;
              setCode2(code);

                const country = countries.find((item) => item.code === code);
                setCurrency2(country.currency);
              }
            } className="bg-teal-600 mt-5 rounded-lg pl-1 text-lg">
              {
                countries.map((country, idx) => {
                  return (
                    <option key={idx} className="text-black">{country.code}</option>
                  );
                })
              }
            </select>
          </div>

        </div>

        <h1 className="bg-blue-300 rounded-lg p-1 pl-3 pr-3 text-black mb-10 font-bold text-xl">
          1 {currency1} = {exchangeAmount} {currency2}
        </h1>
        <h1 className="text-white font-bold text-xl">
          Total {currency2} of {amount} {currency1} = {total}
        </h1>
      </div>

      <div className="flex flex-row gap-5 mt-5">
        {arr.map((items, index) => {
          return (
            <Button value={items.name} onClick={items.action} key={index} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
