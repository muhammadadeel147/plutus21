
import React from 'react';

const DropdownInput = ({ field, value, error, onChange }) => {
  return (
    <div className={`field-wrapper ${error ? 'has-error' : ''}`}>
      <label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="required-mark">*</span>}
      </label>
      <select
        id={field.id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? 'error' : ''}
      >
        <option value="">{field.placeholder || 'Select an option'}</option>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default DropdownInput;