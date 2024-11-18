import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-opacity-75"></div>
    </div>
  );
};

export default Spinner;
