import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const AdminStatCard = ({ title, url }) => {
  const [data, setData] = useState([]);
  const [displayedNumber, setDisplayedNumber] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const { auth } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Adjust the animation duration based on the target value
    if (data.length > displayedNumber) {
      const minDuration = 500; // Minimum duration (0.5 seconds)
      const maxDuration = 2000; // Maximum duration (2 seconds)
      const targetValue = data.length;
      const adjustedDuration = Math.max(
        minDuration,
        Math.min(
          maxDuration,
          (targetValue / 100) * maxDuration // Adjust the divisor for desired animation speed
        )
      );
      setAnimationDuration(adjustedDuration);
    }
  }, [data.length, displayedNumber]);

  useEffect(() => {
    // Animate the count-up effect
    if (displayedNumber < data.length) {
      const timer = setInterval(() => {
        setDisplayedNumber((prevNumber) => Math.min(prevNumber + 1, data.length));
      }, animationDuration / (data.length - displayedNumber)); // Adjust the divisor for desired animation speed

      return () => clearInterval(timer);
    }
  }, [data.length, displayedNumber, animationDuration]);

  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  return (
    <div className="h-40 w-64 rounded-lg flex flex-col justify-around bg-gray-800 shadow-2xl hover:ring hover:ring-gray-500">
      <h2 className="text-5xl">{displayedNumber}</h2>
      <h2 className="text-xl">{title}</h2>
      <h2 className="bg-gray-700 w-max mx-auto rounded-lg px-3 py-1 cursor-pointer hover:scale-90 transition">
        Manage
      </h2>
    </div>
  );
};

export default AdminStatCard;
