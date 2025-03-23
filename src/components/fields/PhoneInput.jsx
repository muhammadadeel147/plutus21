import React, { useState, useEffect } from "react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

const PhoneInput = ({ field, value, error, onChange }) => {

  const countries = getCountries().map((code) => ({
    code,
    phoneCode: `+${getCountryCallingCode(code)}`,
  }));

  const [selectedCountry, setSelectedCountry] = useState(field.defaultCountry || "US");
  const [phoneNumber, setPhoneNumber] = useState("");


  useEffect(() => {
    if (value) {
      const foundCountry = countries.find(c => value.startsWith(c.phoneCode));
      if (foundCountry) {
        setSelectedCountry(foundCountry.code);
        setPhoneNumber(value.replace(foundCountry.phoneCode, "").trim());
      } else {
        setPhoneNumber(value); 
      }
    }
  }, [value]);

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    const countryData = countries.find(c => c.code === newCountry);
    onChange(`${countryData.phoneCode} ${phoneNumber}`.trim());
  };

  const handlePhoneChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    const countryData = countries.find(c => c.code === selectedCountry);
    onChange(`${countryData.phoneCode} ${newPhoneNumber}`.trim());
  };

  const countryData = countries.find(c => c.code === selectedCountry) || countries[0];

  return (
    <div className={`field-wrapper ${error ? "has-error" : ""}`}>
      <label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="required-mark">*</span>}
      </label>
      <div className="phone-input-container">
        <select value={selectedCountry} onChange={handleCountryChange} className="country-select">
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.code} ({country.phoneCode})
            </option>
          ))}
        </select>
        <input
          type="tel"
          id={field.id}
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="Enter number"
          className={`phone-input ${error ? "error" : ""}`}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PhoneInput;
