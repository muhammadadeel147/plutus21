// App.js - Main component
import React, { useState } from 'react';
import FormBuilder from './components/FormBuilder';
import FormPreview from './components/FormPreview';
import DataDisplay from './components/DataDisplay';
import './App.css';

function App() {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});

  const handleFieldsUpdate = (fields) => {
    setFormFields(fields);
  };

  const handleDataUpdate = (data) => {
    setFormData(data);
  };

  return (
    <div className="app-container">
      <h1>Dynamic Form Builder</h1>
      <div className="main-container">
        <div className="builder-section">
          <h2>Form Builder</h2>
          <FormBuilder 
            formFields={formFields} 
            onFieldsUpdate={handleFieldsUpdate} 
          />
        </div>
        <div className="preview-section">
          <h2>Form Preview</h2>
          <FormPreview 
            fields={formFields} 
            onDataUpdate={handleDataUpdate} 
          />
        </div>
        <div className="data-section">
          <h2>Data Display</h2>
          <DataDisplay data={formData} />
        </div>
      </div>
    </div>
  );
}

export default App;


