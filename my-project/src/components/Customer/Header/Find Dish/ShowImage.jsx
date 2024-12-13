import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ShowImage() {
  const location = useLocation();
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Example API fetch logic (replace with actual API call)
    const fetchImageData = async () => {
      const response = await fetch('/api/getImageData');  // Replace with actual API endpoint
      const data = await response.json();
      setImageData(data);
    };

    if (!imageData) {
      fetchImageData();
    }
  }, [imageData]);

  const handleFileUpload = async (event) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    
    // Example API call to upload image (replace with actual API call)
    const response = await fetch('/api/uploadImage', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Optionally, refresh the data after upload
      const newData = await response.json();
      setImageData(newData);
    } else {
      console.error('Upload failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {imageData ? (
        <>
          <img 
            src={imageData.imageUrl} 
            alt={imageData.name} 
            className="w-64 h-64 object-cover rounded-lg shadow-md"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{imageData.name}</h2>
        </>
      ) : (
        <p className="text-gray-500">No image to display.</p>
      )}
      <div className="mt-8">
        <input
          type="file"
          onChange={handleFileUpload}
          className="border border-gray-300 p-2 rounded-lg"
        />
        <button 
          onClick={() => document.querySelector('input[type="file"]').click()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Upload More
        </button>
      </div>
    </div>
  );
}

export default ShowImage;
