export const handleUpload = async (file:File|null) => {
    if (!file) {
      console.error('No file selected.');
      return;
    }

    // Use FormData to send the file to the server
    const formData = new FormData();
    formData.append('image', file);

    // Use fetch to send the form data to the server
    await fetch('http://localhost:3001/images/upload', {
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