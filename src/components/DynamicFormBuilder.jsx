import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, Checkbox, Typography, Card, CardContent } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DynamicFormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});

  const handleAddField = (type, parentId = null) => {
    const newField = { id: Date.now(), type, value: '', nestedFields: [] };
    if (parentId === null) {
      setFields([...fields, newField]);
    } else {
      setFields(fields.map(field => 
        field.id === parentId 
          ? { ...field, nestedFields: [...field.nestedFields, newField] } 
          : { ...field, nestedFields: updateNestedFields(field.nestedFields, parentId, newField) }
      ));
    }
  };

  const updateNestedFields = (nestedFields, parentId, newField) => {
    return nestedFields.map(nested => 
      nested.id === parentId 
        ? { ...nested, nestedFields: [...nested.nestedFields, newField] }
        : { ...nested, nestedFields: updateNestedFields(nested.nestedFields, parentId, newField) }
    );
  };

  const handleRemoveField = (id) => {
    setFields(removeFieldRecursively(fields, id));
    setFormData(prev => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });
  };

  const removeFieldRecursively = (fields, id) => {
    return fields.filter(field => field.id !== id).map(field => ({
      ...field,
      nestedFields: removeFieldRecursively(field.nestedFields, id)
    }));
  };

  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const renderFields = (fields) => {
    return fields.map((field) => (
      <Card key={field.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <CardContent>
          <Typography variant="h6">{field.type}</Typography>

          {field.type === 'text' && (
            <TextField fullWidth label="Enter text" onChange={(e) => handleChange(field.id, e.target.value)} />
          )}
          {field.type === 'dropdown' && (
            <FormControl fullWidth>
              <InputLabel>Choose an option</InputLabel>
              <Select onChange={(e) => handleChange(field.id, e.target.value)}>
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
              </Select>
            </FormControl>
          )}
          {field.type === 'checkbox' && (
            <FormControlLabel control={<Checkbox onChange={(e) => handleChange(field.id, e.target.checked)} />} label="Check me" />
          )}
          {field.type === 'radio' && (
            <RadioGroup onChange={(e) => handleChange(field.id, e.target.value)}>
              <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
              <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
            </RadioGroup>
          )}
          {field.type === 'date' && (
            <DatePicker selected={formData[field.id]} onChange={(date) => handleChange(field.id, date)} />
          )}
          {field.type === 'file' && (
            <input type="file" onChange={(e) => handleChange(field.id, e.target.files[0])} />
          )}
          {field.type === 'phone' && (
            <TextField fullWidth label="Enter phone number" onChange={(e) => handleChange(field.id, e.target.value)} />
          )}

          <Button onClick={() => handleRemoveField(field.id)}>Remove</Button>

          <div>
            <Typography variant="subtitle2">Add Nested Field:</Typography>
            {['text', 'dropdown', 'checkbox', 'radio', 'date', 'file', 'phone'].map((type) => (
              <Button key={type} onClick={() => handleAddField(type, field.id)}>{`Add ${type}`}</Button>
            ))}
          </div>

          {field.nestedFields.length > 0 && (
            <div style={{ marginLeft: '20px', marginTop: '10px', borderLeft: '2px solid #ccc', paddingLeft: '10px' }}>
              {renderFields(field.nestedFields)}
            </div>
          )}
        </CardContent>
      </Card>
    ));
  };

  return (
    <div>
      <h2>Dynamic Form Builder</h2>
      <form onSubmit={handleSubmit}>
        {renderFields(fields)}
        <Button onClick={() => handleAddField('text')}>Add Text Field</Button>
        <Button onClick={() => handleAddField('dropdown')}>Add Dropdown</Button>
        <Button onClick={() => handleAddField('checkbox')}>Add Checkbox</Button>
        <Button onClick={() => handleAddField('radio')}>Add Radio Button</Button>
        <Button onClick={() => handleAddField('date')}>Add Date Picker</Button>
        <Button onClick={() => handleAddField('file')}>Add File Upload</Button>
        <Button onClick={() => handleAddField('phone')}>Add Phone Number</Button>
        <Button type="submit">Submit</Button>
      </form>

      <Typography variant="h6">Form Data:</Typography>
      <Card style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
        <CardContent>
          {Object.entries(formData).map(([key, value]) => (
            <Typography key={key} variant="body1" style={{ marginBottom: '5px' }}>
              <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicFormBuilder;
