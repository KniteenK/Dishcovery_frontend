import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFileUpload from './useFileUpload'; // Import the custom hook

function ShowImage() {
  const location = useLocation();
  const navigate = useNavigate();  // For navigation after upload
  const { file, uploading, handleChange, handleUploadFiles } = useFileUpload(); // Destructure the hook

  const [imageData, setImageData] = useState(location?.state || null); // Use the passed state if available

  useEffect(() => {
    // If imageData is not provided via location, fetch from the API (you can adjust this logic as needed)
    if (!imageData) {
      const fetchImageData = async () => {
        const response = await fetch('/api/getImageData');
        const data = await response.json();
        setImageData(data);
      };
      fetchImageData();
    }
  }, [imageData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {imageData ? (
        <>
          <img 
            src={imageData.imageUrl} 
            alt={imageData.name} 
            className="w-64 h-64 object-cover rounded-lg shadow-md "
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{imageData.name}</h2>
        </>
      ) : (
        <p className="text-gray-500">No image to display.</p>
      )}
      
      <div className="mt-8">
        <input
          type="file"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg"
        />
        <button 
          onClick={() => handleUploadFiles(file, navigate)} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={uploading} // Disable while uploading
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
    </div>
  );
}

export default ShowImage;
