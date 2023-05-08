import { useEffect, useState } from "react";

const Loading = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowText(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="dot animate-loader"></div>
        <div className="dot animate-loader animation-delay-200"></div>
        <div className="dot animate-loader animation-delay-400"></div>
      </div>

      {showText && (
        <>
          <div>Long wait time detected...</div>
          <div>There may be a server error. Please refresh the page to try again.</div>
        </>
      )}
    </div>
  );
};

export default Loading;
