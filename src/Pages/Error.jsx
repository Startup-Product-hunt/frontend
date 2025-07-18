import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-950 text-white px-6">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle size={80} className="text-yellow-400" />
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Page Not Found</p>
        <p className="text-lg text-blue-200 mb-6">
          Sorry, the page you are looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
