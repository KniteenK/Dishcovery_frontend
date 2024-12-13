import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFileUpload from './useFileUpload';

function FindDish() {
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();
  const {
    file,
    uploading,
    handleDrop,
    handleDrag,
    handleDragState,
    handleChange,
    handleCancelUpload,
  } = useFileUpload();

  // Function to handle file upload and call the API
  const handleUpload = async () => {
    if (!file) {
      toast.error('No file selected!');
      return;
    }

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);

      // Send POST request to the backend
      const response = await axios.post('http://localhost:3333/api/v1/user/guessDish', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the server
      if (response.data.success) {
        toast.success('Dish guessed successfully!');
        navigate('/dishDetails', { state: { dish: response.data.dish } }); // Navigate to dish details page
      } else {
        toast.error('Failed to guess the dish!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('An error occurred while uploading the file!');
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center">
      <ToastContainer />
      <main className="flex items-center justify-center w-full max-w-screen-lg mx-auto">
        <div className="w-full flex flex-col items-start justify-center p-4 gap-4 rounded-lg">
          <img src="/scanDish.jpg" alt="Scan the Dish" className="w-2/3 h-auto object-contain rounded-md" />
          <p className="text-6xl text-gray-700 font-extrabold">Scan The Dish.</p>
          <p className="font-extralight">
            Snap a picture of your dish and uncover its name, origin, and delicious secrets in seconds!
          </p>
        </div>

        <div className="w-[90%] h-[40%] flex items-center justify-center p-8">
          <div className="border-2 bg-white border-gray-300 rounded-xl p-6 w-full h-full shadow-md">
            <div
              className={`border-4 border-dashed p-8 rounded-lg w-full h-full flex flex-col items-center justify-center text-center transition-colors ${dragging ? 'border-tertiary bg-orange-100' : 'border-gray-400 bg-white'}`}
              onDrop={handleDrop}
              onDragOver={handleDrag}
              onDragEnter={handleDragState(true)}
              onDragLeave={handleDragState(false)}
            >
              <input
                id="fileInput"
                name="file"
                type="file"
                onChange={handleChange}
                style={{ display: 'none' }}
                accept=".jpeg,.jpg,.png"
              />
              <label htmlFor="fileInput" className="cursor-pointer text-tertiary hover:text-orange-700">
                {file
                  ? 'File selected. You can upload or cancel.'
                  : 'Drag and drop a file here or click to upload.'}
              </label>
              {file && (
                <ul className="mt-4">
                  <li className="text-gray-600">{file.name}</li>
                </ul>
              )}
              <div className="mt-4 flex flex-col justify-center md:flex-row">
                {/* Upload button that calls handleUpload on click */}
                <button
                  onClick={handleUpload}
                  className={`mr-0 md:mr-4 mb-4 md:mb-0 py-2 px-6 bg-tertiary text-white rounded-md hover:bg-orange-700 transition-colors ${
                    uploading || !file ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={uploading || !file}
                >
                  {uploading ? 'Uploading...' : 'Upload File'}
                </button>
                {/* Cancel upload button */}
                <button
                  onClick={handleCancelUpload}
                  className="py-2 px-6 bg-white text-tertiary border border-tertiary rounded-md hover:bg-orange-100 transition-colors cursor-pointer"
                  disabled={!uploading}
                >
                  Cancel Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FindDish;
