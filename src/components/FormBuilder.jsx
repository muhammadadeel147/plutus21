import React, { useState } from 'react';
import FieldTypeSelector from './FieldTypeSelector';
import FieldEditor from './FieldEditor';
import FieldList from './FieldList';

const FormBuilder = ({ formFields, onFieldsUpdate }) => {
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);

  const addField = (fieldType) => {
    const newField = createDefaultField(fieldType);
    const updatedFields = [...formFields, newField];
    onFieldsUpdate(updatedFields);
    setSelectedFieldIndex(updatedFields.length - 1);
  };

  const updateField = (index, updatedField) => {
    const updatedFields = [...formFields];
    updatedFields[index] = updatedField;
    onFieldsUpdate(updatedFields);
  };

  const deleteField = (index) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    onFieldsUpdate(updatedFields);
    setSelectedFieldIndex(null);
  };

  const reorderFields = (startIndex, endIndex) => {
    const updatedFields = [...formFields];
    const [removed] = updatedFields.splice(startIndex, 1);
    updatedFields.splice(endIndex, 0, removed);
    onFieldsUpdate(updatedFields);
    setSelectedFieldIndex(endIndex);
  };

  const createDefaultField = (type) => {
    const baseField = {
      id: `field_${Date.now()}`,
      type,
      label: `New ${type}`,
      required: false,
      conditionalLogic: null,
    };

    switch (type) {
      case 'text':
        return {
          ...baseField,
          placeholder: '',
          validation: { pattern: '', message: '' }
        };
      case 'dropdown':
        return {
          ...baseField,
          options: [{ label: 'Option 1', value: 'option1' }],
          placeholder: 'Select an option'
        };
      case 'radio':
        return {
          ...baseField,
          options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' }
          ]
        };
      case 'checkbox':
        return {
          ...baseField,
          options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' }
          ]
        };
      case 'file':
        return {
          ...baseField,
          acceptedFileTypes: '',
          maxFileSize: 2
        };
      case 'country':
        return {
          ...baseField,
          placeholder: 'Select a country'
        };
      case 'date':
        return {
          ...baseField,
          dateFormat: 'MM/DD/YYYY',
          minDate: '',
          maxDate: ''
        };
      case 'phone':
        return {
          ...baseField,
          defaultCountry: 'US'
        };
      case 'section':
        return {
          ...baseField,
          title: 'New Section',
          description: '',
          fields: []
        };
      default:
        return baseField;
    }
  };

  return (
    <div className="form-builder">
      <FieldTypeSelector onSelectFieldType={addField} />
      <FieldList
        fields={formFields}
        onFieldSelect={(index) => setSelectedFieldIndex(index)}
        onFieldReorder={reorderFields}
        selectedFieldIndex={selectedFieldIndex}
        onDeleteField={deleteField}
      />
      {selectedFieldIndex !== null && (
        <FieldEditor
          field={formFields[selectedFieldIndex]}
          allFields={formFields}
          onFieldUpdate={(updatedField) => updateField(selectedFieldIndex, updatedField)}
          onCancel={() => setSelectedFieldIndex(null)}
        />
      )}
    </div>
  );
};

export default FormBuilder;