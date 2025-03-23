import React, { useEffect, useState } from "react";

const CountryInput = ({ field, value, error, onChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://api.first.org/data/v1/countries");
        const data = await response.json();
        const countryList = Object.entries(data.data).map(([code, details]) => ({
          code,
          name: details.country,
        }));

        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className={`field-wrapper ${error ? "has-error" : ""}`}>
      <label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="required-mark">*</span>}
      </label>
      <select
        id={field.id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "error" : ""}
      >
        <option value="">{field.placeholder || "Select a country"}</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CountryInput;
