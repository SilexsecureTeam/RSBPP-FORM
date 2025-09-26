import React from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const { state } = useLocation();
  const userName = state?.name || "User"; // Fallback if name is not passed

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-8">
      <div className="max-w-md mx-auto px-8 py-8 bg-white rounded-lg shadow-lg text-center">
        <svg
          className="w-16 h-16 mx-auto text-green-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Thank You, {userName}!
        </h2>
        <p className="text-gray-600 mb-6">
          Your course registration has been successfully submitted. We
          appreciate your interest and will contact you soon with further
          details.
        </p>
        <button
          onClick={() => (window.location.href = "https://rsbpp.nl/")}
          className="border-2 bg-transparent border-[#D40B0B] text-[#D40B0B] py-2 px-6 rounded-md hover:bg-[#D40B0B] hover:text-white transition-colors font-bold"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
