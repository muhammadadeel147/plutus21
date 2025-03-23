import React from 'react';

const FieldList = ({ fields, onFieldSelect, onFieldReorder, selectedFieldIndex, onDeleteField }) => {
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (sourceIndex !== targetIndex) {
      onFieldReorder(sourceIndex, targetIndex);
    }
  };

  const renderFieldItem = (field, index, isNested = false, path = []) => {
    const currentPath = [...path, index];
    const isSelected = !isNested && index === selectedFieldIndex;

    return (
      <div
        key={field.id}
        className={`field-item ${isSelected ? 'selected' : ''} ${isNested ? 'nested' : ''}`}
        onClick={() => !isNested && onFieldSelect(index)}
        draggable={!isNested}
        onDragStart={(e) => !isNested && handleDragStart(e, index)}
        onDragOver={handleDragOver}
        onDrop={(e) => !isNested && handleDrop(e, index)}
      >
        <div className="field-item-content">
          <span className="field-type">{field.type}</span>
          <span className="field-label">{field.type === 'section' ? field.title : field.label}</span>
          {!isNested && (
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteField(index);
              }}
            >
              ×
            </button>
          )}
        </div>

        {field.type === 'section' && field.fields && field.fields.length > 0 && (
          <div className="nested-fields">
            {field.fields.map((nestedField, nestedIndex) =>
              renderFieldItem(nestedField, nestedIndex, true, currentPath)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="field-list">
      <h3>Form Fields</h3>
      <div className="field-items">
        {fields.length === 0 ? (
          <div className="no-fields">No fields added yet.</div>
        ) : (
          fields.map((field, index) => renderFieldItem(field, index))
        )}
      </div>
    </div>
  );
};

export default FieldList;