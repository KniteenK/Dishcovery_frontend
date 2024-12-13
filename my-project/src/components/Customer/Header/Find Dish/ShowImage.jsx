import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ShowImage() {
  const [imageData, setImageData] = useState({
    imageUrl: 'https://via.placeholder.com/150', // Mock image URL
    name: 'Mock Dish Name' // Mock dish name
  });
  const navigate = useNavigate(); // Initialize useNavigate

  // Navigate to the 'customer/FindDish' route
  const handleNavigate = () => {
    navigate('/customer/FindDish');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {imageData ? (
        <>
          <img
            src={imageData.imageUrl}
            alt={imageData.name}
            className="w-[30%] rounded-lg shadow-md h-[60%]"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{imageData.name}</h2>
        </>
      ) : (
        <p className="text-gray-500">No image to display.</p>
      )}

      <div className="mt-8">
        <button
          onClick={handleNavigate}
          className="mt-4 px-4 py-2 bg-tertiary text-white rounded-lg hover:bg-tertiary"
        >
          Upload More
        </button>
      </div>
    </div>
  );
}

export default ShowImage;
