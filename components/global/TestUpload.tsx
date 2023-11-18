// ImageUploadForm.tsx

import React, { ChangeEvent, useState } from 'react';

const ImageUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      console.error('No file selected.');
      return;
    }

    // Use FormData to send the file to the server
    const formData = new FormData();
    formData.append('image', file);

    // Use fetch to send the form data to the server
    fetch('http://your-node-server/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Image uploaded successfully:', data);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUploadForm;
