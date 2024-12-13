import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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
    handleUploadFiles,
    handleCancelUpload,
  } = useFileUpload();

  return (
    <div className="mt-[10%]">
      <ToastContainer />
      <main className="flex flex-row items-start justify-center w-full max-w-screen-lg mx-auto">
        <div className="w-1/3 flex items-center justify-center p-4 rounded-lg">
          <img src="https://img.freepik.com/free-photo/close-up-hands-holding-smartphone_23-2149250085.jpg?semt=ais_hybrid" alt="Food Search" className="w-full h-auto object-contain rounded-md" />
        </div>

        <div className="w-[50%] h-[80%] flex items-center justify-center p-8">
          <div className="border-2 border-gray-300 rounded-lg p-4 w-full h-full">
            <div
              className={`border-4 border-dashed p-8 rounded-lg w-full h-full flex flex-col items-center justify-center text-center transition-colors ${dragging ? 'border-orange-500 bg-orange-100' : 'border-gray-400 bg-white'}`}
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
              <label
                htmlFor="fileInput"
                className="cursor-pointer text-orange-500 hover:text-orange-700"
              >
                {file
                  ? 'File selected. You can upload or cancel.'
                  : 'Drag and drop a file here or click to upload.'}
              </label>
              {file && (
                <ul className="mt-4">
                  <li className="text-gray-600">{file.name}</li>
                </ul>
              )}
            </div>

            <div className="mt-6 flex flex-col md:flex-row">
              <button
                onClick={() => handleUploadFiles(file, navigate)}
                className={`mr-0 md:mr-4 mb-4 md:mb-0 py-2 px-6 bg-orange-500 text-white rounded-md hover:bg-orange-700 transition-colors ${
                  uploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={uploading || !file}
              >
                {uploading ? 'Uploading...' : 'Upload File'}
              </button>
              <button
                onClick={handleCancelUpload}
                className="py-2 px-6 bg-white text-orange-500 border border-orange-500 rounded-md hover:bg-orange-100 transition-colors cursor-pointer"
                disabled={!uploading}
              >
                Cancel Upload
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FindDish;
