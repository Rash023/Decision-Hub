import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RuleBuilderPage = () => {
  const [newRule, setNewRule] = useState('');

  const handleAddRule = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/rule/addRule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newRule }),
      });

      if (response) {
        toast.success('Rule added successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Failed to add rule!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      console.log(response);
    } catch (error) {
      console.error('Error:', error.message);
      // Show error toast
      toast.error('Error adding rule!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-700 p-8 shadow-md rounded-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6">Decision Hub - Rule Builder</h2>
        <label className="block mb-4">
          Add New Rule:
          <input
            type="text"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            className="w-full p-2 border rounded-md text-black" 
            required
          />
        </label>
        <button
          onClick={handleAddRule}
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};
export default RuleBuilderPage;
