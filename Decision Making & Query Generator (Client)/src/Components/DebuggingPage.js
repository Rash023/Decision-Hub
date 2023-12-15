import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DebuggingPage = () => {
  const [question, setQuestion] = useState('');
  const [generatedQuery, setGeneratedQuery] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/query/generateQuery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userQuery: question }),
      });

      if (response.ok) {
        const result = await response.json();
        setGeneratedQuery(result?.response);
      } else {
        console.error('Failed to generate query.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCopy = () => {
    if (generatedQuery) {
      copy(generatedQuery);
      toast.success('Code copied to clipboard!', {
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

  const components = {
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter language={match[1]} style={materialDark}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-700 p-8 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4">Decision Hub - Debugging</h2>
        <label className="block mb-2">
          Provide a Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded-md text-white bg-gray-600" 
            required
          />
        </label>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>

        {generatedQuery && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Generated Query:</h3>
            <div className="relative">
              <button
                onClick={handleCopy}
                className="absolute right-2 top-2 px-2 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Copy
              </button>
              <ReactMarkdown components={components}>{generatedQuery}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebuggingPage;
