import React, { useEffect, useState } from "react";
import "./CurrencyConverter.css";

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  // Fetch currency data on component mount
  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }
        
        const data = await response.json();
        
        // Set the rates and available currencies
        setRates(data.rates);
        setCurrencies(Object.keys(data.rates).sort());
        
        // Set default selections
        setFromCurrency("USD");
        setToCurrency("EUR");
        
        // Format the last updated date
        const date = new Date(data.time_last_updated * 1000);
        setLastUpdated(date.toLocaleString());
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  // Handle conversion when amount, fromCurrency, or toCurrency changes
  useEffect(() => {
    if (amount && fromCurrency && toCurrency && rates[fromCurrency] && rates[toCurrency]) {
      // Convert to USD first (as base), then to target currency
      const amountInUSD = amount / rates[fromCurrency];
      const convertedValue = amountInUSD * rates[toCurrency];
      setConvertedAmount(convertedValue.toFixed(4));
    } else {
      setConvertedAmount(null);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimals
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  if (loading) {
    return <div className="currency-loader">Loading exchange rates...</div>;
  }

  if (error) {
    return <div className="currency-error">Error: {error}</div>;
  }

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div className="converter-card">
        <div className="input-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            aria-label="Amount to convert"
          />
        </div>

        <div className="currencies-container">
          <div className="currency-select">
            <label htmlFor="fromCurrency">From</label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              aria-label="Currency to convert from"
            >
              <option value="">Select currency</option>
              {currencies.map((currency) => (
                <option key={`from-${currency}`} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="swap-button" 
            onClick={swapCurrencies}
            aria-label="Swap currencies"
          >
            ⇄
          </button>

          <div className="currency-select">
            <label htmlFor="toCurrency">To</label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={handleToCurrencyChange}
              aria-label="Currency to convert to"
            >
              <option value="">Select currency</option>
              {currencies.map((currency) => (
                <option key={`to-${currency}`} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        {convertedAmount && amount && (
          <div className="result">
            <h3>Conversion Result</h3>
            <p className="conversion-text">
              {amount} {fromCurrency} = 
            </p>
            <p className="converted-amount">
              {convertedAmount} {toCurrency}
            </p>
            <div className="exchange-rate">
              <p>
                1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(6)} {toCurrency}
              </p>
            </div>
          </div>
        )}

        <div className="info-footer">
          <p>Data last updated: {lastUpdated}</p>
          <p>Source: Exchange Rate API</p>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;