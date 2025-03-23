import React, { useState, useEffect } from 'react';

const FieldEditor = ({ field, allFields, onFieldUpdate, onCancel }) => {
  const [editedField, setEditedField] = useState(field);

  useEffect(() => {
    setEditedField(field);
  }, [field]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedField({
      ...editedField,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleOptionChange = (index, key, value) => {
    if (!editedField.options) return;

    const updatedOptions = [...editedField.options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [key]: value
    };

    setEditedField({
      ...editedField,
      options: updatedOptions
    });
  };

  const addOption = () => {
    if (!editedField.options) return;

    const newOption = {
      label: `Option ${editedField.options.length + 1}`,
      value: `option${editedField.options.length + 1}`
    };

    setEditedField({
      ...editedField,
      options: [...editedField.options, newOption]
    });
  };

  const removeOption = (index) => {
    if (!editedField.options) return;

    setEditedField({
      ...editedField,
      options: editedField.options.filter((_, i) => i !== index)
    });
  };

  const handleValidationChange = (key, value) => {
    setEditedField({
      ...editedField,
      validation: {
        ...editedField.validation,
        [key]: value
      }
    });
  };

  const handleConditionalLogicChange = (e) => {
    const { name, value } = e.target;
    
    setEditedField({
      ...editedField,
      conditionalLogic: {
        ...editedField.conditionalLogic || {},
        [name]: value
      }
    });
  };

  const toggleConditionalLogic = (e) => {
    if (e.target.checked) {
      setEditedField({
        ...editedField,
        conditionalLogic: {
          fieldId: '',
          operator: 'equals',
          value: ''
        }
      });
    } else {
      setEditedField({
        ...editedField,
        conditionalLogic: null
      });
    }
  };

  const availableFields = allFields.filter(f => f.id !== editedField.id);

  const renderCommonFields = () => (
    <>
      <div className="form-group">
        <label>Field Label:</label>
        <input
          type="text"
          name="label"
          value={editedField.label}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Required:</label>
        <input
          type="checkbox"
          name="required"
          checked={editedField.required}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Use Conditional Logic:</label>
        <input
          type="checkbox"
          checked={!!editedField.conditionalLogic}
          onChange={toggleConditionalLogic}
        />
      </div>
      {editedField.conditionalLogic && (
        <div className="conditional-logic-settings">
          <div className="form-group">
            <label>Show this field if:</label>
            <select
              name="fieldId"
              value={editedField.conditionalLogic.fieldId}
              onChange={handleConditionalLogicChange}
            >
              <option value="">Select a field</option>
              {availableFields.map(field => (
                <option key={field.id} value={field.id}>{field.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Operator:</label>
            
            <select name="operator" value={editedField.conditionalLogic.operator} onChange={handleConditionalLogicChange}>
                <option value="equals">Equals</option>
                <option value="notEquals">Not equals</option>
                <option value="contains">Contains</option>
                <option value="doesNotContain">Does not contain</option>
                <option value="greaterThan">Greater than</option>
                <option value="greaterThanOrEqual">Greater than or equal</option>
                <option value="lessThan">Less than</option>
                <option value="lessThanOrEqual">Less than or equal</option>
                <option value="startsWith">Starts with</option>
                <option value="endsWith">Ends with</option>
                <option value="isEmpty">Is empty</option>
                <option value="isNotEmpty">Is not empty</option>
              </select>
          </div>
          <div className="form-group">
            <label>Value:</label>
            <input
              type="text"
              name="value"
              value={editedField.conditionalLogic.value}
              onChange={handleConditionalLogicChange}
            />
          </div>
        </div>
      )}
    </>
  );

  const renderFieldOptions = () => {
    switch (editedField.type) {
      case 'text':
        return (
          <>
            <div className="form-group">
              <label>Placeholder:</label>
              <input
                type="text"
                name="placeholder"
                value={editedField.placeholder}
                onChange={handleChange}
              />
            </div>
           
          </>
        );
      case 'dropdown':
      case 'radio':
      case 'checkbox':
        return (
          <>
            {editedField.type === 'dropdown' && (
              <div className="form-group">
                <label>Placeholder:</label>
                <input
                  type="text"
                  name="placeholder"
                  value={editedField.placeholder}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="form-group">
              <label>Options:</label>
              {editedField.options.map((option, index) => (
                <div key={index} className="option-row">
                  <input
                    type="text"
                    placeholder="Label"
                    value={option.label}
                    onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={option.value}
                    onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                  />
                  <button type="button" onClick={() => removeOption(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addOption}>
                Add Option
              </button>
            </div>
          </>
        );
      case 'file':
        return (
          <>
            <div className="form-group">
              <label>Accepted File Types (comma-separated):</label>
              <input
                type="text"
                name="acceptedFileTypes"
                value={editedField.acceptedFileTypes}
                onChange={handleChange}
                placeholder=".pdf,.jpg,.png"
              />
            </div>
            <div className="form-group">
              <label>Max File Size (MB):</label>
              <input
                type="number"
                name="maxFileSize"
                value={editedField.maxFileSize}
                onChange={handleChange}
                min="1"
              />
            </div>
          </>
        );
      case 'date':
        return (
          <>
            <div className="form-group">
              <label>Date Format:</label>
              <select
                name="dateFormat"
                value={editedField.dateFormat}
                onChange={handleChange}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <div className="form-group">
              <label>Min Date:</label>
              <input
                type="date"
                name="minDate"
                value={editedField.minDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Max Date:</label>
              <input
                type="date"
                name="maxDate"
                value={editedField.maxDate}
                onChange={handleChange}
              />
            </div>
          </>
        );
      case 'phone':
        return (
          <div className="form-group">
            <label>Default Country:</label>
            <select
              name="defaultCountry"
              value={editedField.defaultCountry}
              onChange={handleChange}
            >
              <option value="US">United States (+1)</option>
              <option value="GB">United Kingdom (+44)</option>
              <option value="IN">India (+91)</option>
              <option value="AU">Australia (+61)</option>
              <option value="CA">Canada (+1)</option>
            </select>
          </div>
        );
      case 'section':
        return (
          <>
            <div className="form-group">
              <label>Section Title:</label>
              <input
                type="text"
                name="title"
                value={editedField.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={editedField.description}
                onChange={handleChange}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleSave = () => {
    onFieldUpdate(editedField);
  };

  return (
    <div className="field-editor">
      <h3>Edit {editedField.type.charAt(0).toUpperCase() + editedField.type.slice(1)} Field</h3>
      <div className="editor-form">
        {renderCommonFields()}
        {renderFieldOptions()}
        <div className="editor-buttons">
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldEditor;