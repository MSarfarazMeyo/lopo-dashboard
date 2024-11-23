import React from "react";
import Loader from "./Loader";

const FullScreenLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
      <div className="flex flex-col items-center">
        <Loader size="large" />
      </div>
    </div>
  );
};

export default FullScreenLoader;
