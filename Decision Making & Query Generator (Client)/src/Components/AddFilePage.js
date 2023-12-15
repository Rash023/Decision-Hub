import React from 'react';

const AddFilePage = () => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // Handle logic for file upload (e.g., send to server)
    console.log('Uploaded file:', file.name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="bg-gray-700 p-8 shadow-md rounded-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4">Decision Hub - Add File</h2>
        <label className="block mb-4 relative">
          <span className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer">
            Choose File
          </span>
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden" 
            required
          />
          <span className="text-white ml-2">
            
            No file chosen
          </span>
        </label>
      </div>
    </div>
  );
};

export default AddFilePage;
