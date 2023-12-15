import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DecisionMakingPage = () => {
  const [userQuestion, setUserQuestion] = useState('');

  const handleCheckValidity = async () => {
    try {
      
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userQuestion }),
      });

      if (response) {
        const result = await response.json();
        // Handle the result as needed
        if (result) {
          toast.success('Question is valid!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error('Question is not valid!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        console.error('Failed to check question validity.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-700 p-8 shadow-md rounded-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4">Decision Hub - Decision Making</h2>
        <label className="block mb-4">
          Enter Your Decision:
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            className="w-full p-2 border text-black rounded-md"
            required
          />
        </label>
        <button
          onClick={handleCheckValidity}
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Check Validity
        </button>
      </div>
    </div>
  );
};

export default DecisionMakingPage;
