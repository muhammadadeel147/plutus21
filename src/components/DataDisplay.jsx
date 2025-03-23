import React from 'react';

const DataDisplay = ({ fields, data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="data-display empty">
        <p>No data to display yet.</p>
      </div>
    );
  }
  return (
    <div className="data-display">
      <ul className="data-list">
        {fields.map((field) => {
          const value = data[field.id] || 'N/A';
          return (
            <li key={field.name} className="data-item">
              <span className="data-key">{field.label || field.name}:</span>
              <span className="data-value">{typeof value === 'object' ? JSON.stringify(value) : value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DataDisplay;
