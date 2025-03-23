import React from 'react';
import TextInput from './fields/TextInput';
import DropdownInput from './fields/DropdownInput';
import RadioInput from './fields/RadioInput';
import CheckboxInput from './fields/CheckboxInput';
import FileInput from './fields/FileInput';
import CountryInput from './fields/CountryInput';
import DateInput from './fields/DateInput';
import PhoneInput from './fields/PhoneInput';
import SectionField from './fields/SectionField';

const FormRenderer = ({ fields, values, errors, onChange }) => {
  const shouldShowField = (field) => {
    if (!field.conditionalLogic) return true;
    
    const { fieldId, operator, value } = field.conditionalLogic;
    const sourceValue = values[fieldId];
    
    if (sourceValue === undefined) return false;
    
    switch (operator) {
      case 'equals':
        return sourceValue === value;
      case 'notEquals':
        return sourceValue !== value;
      case 'contains':
        return String(sourceValue).includes(value);
      case 'greaterThan':
        return Number(sourceValue) > Number(value);
      case 'lessThan':
        return Number(sourceValue) < Number(value);
      default:
        return true;
    }
  };

  const renderField = (field) => {
    if (!shouldShowField(field)) return null;
    
    const props = {
      field,
      value: values[field.id] || '',
      error: errors[field.id] || '',
      onChange: (value) => onChange(field.id, value)
    };
    
    switch (field.type) {
      case 'text':
        return <TextInput {...props} />;
      case 'dropdown':
        return <DropdownInput {...props} />;
      case 'radio':
        return <RadioInput {...props} />;
      case 'checkbox':
        return <CheckboxInput {...props} />;
      case 'file':
        return <FileInput {...props} />;
      case 'country':
        return <CountryInput {...props} />;
      case 'date':
        return <DateInput {...props} />;
      case 'phone':
        return <PhoneInput {...props} />;
      case 'section':
        return (
          <SectionField
            {...props}
            fields={field.fields || []}
            values={values}
            errors={errors}
            onChange={onChange}
            renderField={renderField}
          />
        );
      default:
        return <div>Unknown field type: {field.type}</div>;
    }
  };

  return (
    <div className="form-renderer">
      {fields.map((field) => (
        <div key={field.id} className="field-container">
          {renderField(field)}
        </div>
      ))}
    </div>
  );
};

export default FormRenderer;
