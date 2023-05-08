import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center">
      <div className="dot animate-loader"></div>
      <div className="dot animate-loader animation-delay-200"></div>
      <div className="dot animate-loader animation-delay-400"></div>
    </div>
  );
};

export default Loading;
