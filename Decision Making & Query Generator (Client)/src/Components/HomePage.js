import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="bg-gray-700 p-6 rounded-md shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Decision Hub</h2>
        <div className="flex flex-col items-center">
          <Link to="/rule-builder" className="btn-dark mb-2 font-semibold">
            Rule Builder
          </Link>
          <Link to="/rule-management" className="btn-dark mb-2 font-semibold">
            Rule Management
          </Link>
          <Link to="/debugging" className="btn-dark mb-2 font-semibold">
            Debugging
          </Link>
          <Link to="/add-file" className="btn-dark mb-2 font-semibold">
            Add File
          </Link>
          <Link to="/decision-making" className="btn-dark mb-2 font-semibold">
            Decision Making
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
