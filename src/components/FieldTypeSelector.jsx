import React from 'react';

const FieldTypeSelector = ({ onSelectFieldType }) => {
  const fieldTypes = [
    { type: 'text', label: 'Text Field' },
    { type: 'dropdown', label: 'Dropdown' },
    { type: 'radio', label: 'Radio Button' },
    { type: 'checkbox', label: 'Checkbox' },
    { type: 'file', label: 'File Upload' },
    { type: 'country', label: 'Country' },
    { type: 'date', label: 'Date Picker' },
    { type: 'phone', label: 'Phone Number' },
    { type: 'section', label: 'Section' }
  ];

  return (
    <div className="field-type-selector">
      <h3>Add Field</h3>
      <div className="field-type-buttons">
        {fieldTypes.map((field) => (
          <button
            key={field.type}
            onClick={() => onSelectFieldType(field.type)}
            className="field-type-button"
          >
            {field.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FieldTypeSelector;