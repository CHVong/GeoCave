import { useState, useEffect } from "react";
import LoadingCard from "./LoadingCard";

const AdminStatCard = ({ title, count, icon, onClick, link }) => {
  const [displayedNumber, setDisplayedNumber] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(1000);

  useEffect(() => {
    // Adjust the animation duration based on the target value
    if (count > displayedNumber) {
      const minDuration = 500; // Minimum duration (0.5 seconds)
      const maxDuration = 2000; // Maximum duration (2 seconds)
      const targetValue = count;
      const adjustedDuration = Math.max(
        minDuration,
        Math.min(
          maxDuration,
          (targetValue / 100) * maxDuration // Adjust the divisor for desired animation speed
        )
      );
      setAnimationDuration(adjustedDuration);
    }
  }, [count, displayedNumber]);

  useEffect(() => {
    // Animate the count-up effect
    if (displayedNumber < count) {
      const timer = setInterval(() => {
        setDisplayedNumber((prevNumber) => Math.min(prevNumber + 1, count));
      }, animationDuration / (count - displayedNumber)); // Adjust the divisor for desired animation speed

      return () => clearInterval(timer);
    }
  }, [count, displayedNumber, animationDuration]);

  return (
    <div className="h-40 w-64 rounded-lg flex flex-col justify-around bg-gray-800 shadow-2xl hover:ring hover:ring-gray-500 group p-2">
      {count ? (
        <div className="animate-fadeIn">
          <h2 className="text-5xl">{displayedNumber}</h2>

          {icon}
          <h2 className="text-lg font-medium">{title}</h2>

          <h2
            className="bg-gray-700 w-max mx-auto rounded-lg px-3 py-1 cursor-pointer hover:scale-90 hover:text-gray-700 hover:bg-gray-300 transition hover:font-medium"
            onClick={() => onClick(link)}
          >
            Manage
          </h2>
        </div>
      ) : (
        <LoadingCard />
      )}
    </div>
  );
};

export default AdminStatCard;
