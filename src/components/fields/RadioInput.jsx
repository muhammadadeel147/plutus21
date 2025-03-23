
import React from 'react';

const RadioInput = ({ field, value, error, onChange }) => {
  return (
    <div className={`field-wrapper ${error ? 'has-error' : ''}`}>
      <fieldset>
        <legend>
          {field.label}
          {field.required && <span className="required-mark">*</span>}
        </legend>
        <div className="radio-options">
          {field.options.map((option) => (
            <div key={option.value} className="radio-option">
              <input
                type="radio"
                id={`${field.id}_${option.value}`}
                name={field.id}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
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

export default RadioInput;