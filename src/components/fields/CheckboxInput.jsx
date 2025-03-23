
import React from 'react';

const CheckboxInput = ({ field, value, error, onChange }) => {
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  const handleChange = (optionValue) => {
    let newValues;
    if (selectedValues.includes(optionValue)) {
      newValues = selectedValues.filter(val => val !== optionValue);
    } else {
      newValues = [...selectedValues, optionValue];
    }
    onChange(newValues);
  };

  return (
    <div className={`field-wrapper ${error ? 'has-error' : ''}`}>
      <fieldset>
        <legend>
          {field.label}
          {field.required && <span className="required-mark">*</span>}
        </legend>
        <div className="checkbox-options">
          {field.options.map((option) => (
            <div key={option.value} className="checkbox-option">
              <input
                type="checkbox"
                id={`${field.id}_${option.value}`}
                name={field.id}
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleChange(option.value)}
              />
              <label htmlFor={`${field.id}_${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </fieldset>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CheckboxInput;