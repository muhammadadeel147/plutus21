import React from 'react';

const TextInput = ({ field, value, error, onChange }) => {
  return (
    <div className={`field-wrapper ${error ? 'has-error' : ''}`}>
      <label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="required-mark">*</span>}
      </label>
      <input
        type="text"
        id={field.id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder || ''}
        className={error ? 'error' : ''}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TextInput;


