import React, { useEffect, useState } from "react";

function CurrencyConverter() {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [inrAmount, setInrAmount] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);
  const [conversionData, setConversionData] = useState({});

  //   first use effect to call API just once initially
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/INR"
        );
        const data = await response.json();
        const newData = data.rates;
        setConversionData(newData);
        setOptions(Object.keys(newData));
      } catch (error) {
        console.error("Error fetching conversion rate", error);
      }
    };

    fetchData();
  }, []);

  // second use effect run on change of a state of the component
  useEffect(() => {
    const converterMethod = async () => {
        // console.log(selectedValue);
        // console.log(conversionData);
        const convertedInr = parseFloat(selectedCurrency/conversionData[selectedValue]).toFixed(2);
        setInrAmount(convertedInr);
    };

    converterMethod();
  }, [selectedCurrency]);

  const handleInputChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    setSelectedCurrency("");
  };

  return (
    <div>
      <h2>Any Currency to INR converter</h2>
      <label htmlFor="mySelect">Choose a currency from the list : </label>
      <select id="mySelect" value={selectedValue} onChange={handleSelectChange}>
        <option value="">Select...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div style={{ paddingTop: "10px" }}>
        <label style={{ marginRight: "8px" }}>
          {selectedValue!="" ? selectedValue : "`Currency to be Selected`"} Amount : 
          <input
            type="number"
            value={selectedCurrency}
            onChange={handleInputChange}
            style={{ marginLeft: "8px" }}
          ></input>
          {inrAmount != null && selectedCurrency != "" && (
            <p>{`INR Amount: Rs. ${inrAmount}`}</p>
          )}
        </label>
      </div>
    </div>
  );
}

export default CurrencyConverter;
