import React, { useState } from 'react';

const FileInput = ({ field, value, error, onChange }) => {
  const [fileName, setFileName] = useState('');
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFileName('');
      onChange('');
      return;
    }
    

    if (field.acceptedFileTypes) {
      const acceptedTypes = field.acceptedFileTypes.split(',').map(type => type.trim());
      const fileExt = '.' + file.name.split('.').pop().toLowerCase();
      if (!acceptedTypes.includes(fileExt) && !acceptedTypes.includes(file.type)) {
        setFileName('');
        onChange('');
        alert(`File type not accepted. Please upload ${field.acceptedFileTypes}`);
        return;
      }
    }
    

    if (field.maxFileSize && file.size > field.maxFileSize * 1024 * 1024) {
      setFileName('');
      onChange('');
      alert(`File size exceeds the maximum limit of ${field.maxFileSize}MB`);
      return;
    }
    
    setFileName(file.name);
    onChange(file);
  };

  return (
    <div className={`field-wrapper ${error ? 'has-error' : ''}`}>
      <label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="required-mark">*</span>}
      </label>
      <div className="file-input-container">
        <input
          type="file"
          id={field.id}
          onChange={handleFileChange}
          accept={field.acceptedFileTypes}
          className={error ? 'error' : ''}
        />
        {fileName && <div className="file-name">{fileName}</div>}
      </div>
      <div className="file-info">
        {field.acceptedFileTypes && (
          <span>Accepted file types: {field.acceptedFileTypes}</span>
        )}
        {field.maxFileSize && (
          <span>Maximum file size: {field.maxFileSize}MB</span>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FileInput;