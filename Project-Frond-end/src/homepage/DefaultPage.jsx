import React from "react";

function DefaultPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-4xl font-extrabold text-gray-800">Oops!</h1>
        <p className="mb-6 text-lg text-gray-600">
          This page is not available. It might have been removed or you might
          have taken a wrong turn.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

export default DefaultPage;
