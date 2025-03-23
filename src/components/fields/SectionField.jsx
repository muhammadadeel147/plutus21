import React from 'react';

const SectionField = ({ field, fields, values, errors, onChange, renderField }) => {
  return (
    <div className="section-field">
      <div className="section-header">
        <h3>{field.title}</h3>
        {field.description && <p>{field.description}</p>}
      </div>
      <div className="section-content">
        {fields.map((nestedField) => (
          <div key={nestedField.id} className="nested-field-container">
            {renderField(nestedField)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionField;