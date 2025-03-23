import React, { useState, useEffect } from 'react';
import FormRenderer from './FormRenderer';

const FormPreview = ({ fields, onDataUpdate }) => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setFormValues({});
    setFormErrors({});
  }, [fields]);

  const handleChange = (fieldId, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
    

    const field = findFieldById(fields, fieldId);
    if (field) {
      validateField(field, value);
    }

    onDataUpdate({
      ...formValues,
      [fieldId]: value
    });
  };

  const findFieldById = (fields, id, result = null) => {
    for (const field of fields) {
      if (field.id === id) {
        return field;
      }
      
      if (field.type === 'section' && field.fields) {
        const nestedResult = findFieldById(field.fields, id);
        if (nestedResult) return nestedResult;
      }
    }
    
    return result;
  };

  const validateField = (field, value) => {
    let error = '';

    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      error = 'This field is required';
    } 

    else if (field.type === 'text' && field.validation?.pattern && value) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) {
        error = field.validation.message || 'Invalid format';
      }
    }
    
    setFormErrors(prev => ({
      ...prev,
      [field.id]: error
    }));
    
    return error === '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const errors = {};
    
    const validateAllFields = (fieldsArray) => {
      for (const field of fieldsArray) {
        if (field.type === 'section' && field.fields) {
          validateAllFields(field.fields);
        } else {
          const value = formValues[field.id];
          if (!validateField(field, value)) {
            isValid = false;
            errors[field.id] = formErrors[field.id] || 'This field is required';
          }
        }
      }
    };
    
    validateAllFields(fields);
    
    if (isValid) {
      console.log('Form submitted with values:', formValues);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="form-preview">
      <form onSubmit={handleSubmit}>
        <FormRenderer
          fields={fields}
          values={formValues}
          errors={formErrors}
          onChange={handleChange}
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPreview;