
import React from 'react';

const DateInput = ({ field, value, error, onChange }) => {

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    
    return date.toISOString().split('T')[0];
  };

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    
    switch (field.dateFormat) {
      case 'MM/DD/YYYY':
        return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
      case 'DD/MM/YYYY':
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      case 'YYYY-MM-DD':
      default:
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
  };

  const handleChange = (e) => {
    const inputDate = e.target.value;
    if (!inputDate) {
      onChange('');
      return;
    }

    const formattedDate = formatDateForDisplay(inputDate);
    onChange(formattedDate);
  };

  return (
    <div className={`field-wrapper ${error ? 'has-error' : ''}`}>
      <label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="required-mark">*</span>}
      </label>
      <input
        type="date"
        id={field.id}
        value={formatDateForInput(value)}
        onChange={handleChange}
        min={field.minDate || ''}
        max={field.maxDate || ''}
        className={error ? 'error' : ''}
      />
      {value && (
        <div className="formatted-date">
          Format: {formatDateForDisplay(value)}
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default DateInput;