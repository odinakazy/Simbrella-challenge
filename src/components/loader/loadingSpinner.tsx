import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center pt-4">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
