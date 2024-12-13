// useFileUpload.js
import { useState } from 'react';
import { toast } from 'react-toastify';

const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleDragState = (isDragging) => (e) => {
    e.preventDefault();
    setDragging(isDragging);
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUploadFiles = async (file, navigate) => {
    if (!file) {
      toast.info("No file selected. Please select a JPEG, JPG, or PNG file.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setUploading(false);
        const result = {
          imageUrl: data.filePath, // Server response with the file path
          name: file.name,
        };
        setFile(null);
        toast.success('File uploaded successfully!');
        navigate('/customer/show-image', { state: result }); // Pass the file path to the next page
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file.');
      setUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setUploading(false);
    setFile(null);
    toast.info('File upload canceled.');
  };

  return {
    file,
    uploading,
    handleDrop,
    handleDrag,
    handleDragState,
    handleChange,
    handleUploadFiles,
    handleCancelUpload,
  };
};

export default useFileUpload;
