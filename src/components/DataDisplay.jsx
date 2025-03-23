import React from 'react';

const DataDisplay = ({ data }) => {
  console.log(data)
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="data-display empty">
        <p>No data to display yet.</p>
      </div>
    );
  }

  const renderData = (dataObj) => {
    return (
      <ul className="data-list">
        {Object.entries(dataObj).map(([key, value]) => (
          <li key={key} className="data-item">
            <span className="data-key">{key}:</span>
            <span className="data-value">
              {typeof value === 'object' && value !== null
                ? renderData(value)
                : String(value)}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="data-display">
      <div className="data-content">
        {renderData(data)}
      </div>
    </div>
  );
};

export default DataDisplay;