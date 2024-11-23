import React, { useEffect, useState } from "react";
import Sun from "../assets/sun.png";
import FullScreenLoader from "../components/loader/FullScreenLoader";
import { useGetHomeData } from "../hooks/useHome";

const Home: React.FC = () => {
  const { data: contests, isLoading } = useGetHomeData();
  const [time, setTime] = useState<Date>(new Date());

  // Timer setup
  useEffect(() => {
    const timerID = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerID); // Clean up on unmount
  }, []); // Empty dependencies to avoid unnecessary re-renders

  // Format date (with suffix for day)
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const day = date.getDate();
    let suffix = "th";
    if (day < 11 || day > 20) {
      switch (day % 10) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
        default:
          break;
      }
    }
    return date
      .toLocaleDateString("en-US", options)
      .replace(/(\d+)(th)?/, `$1${suffix}`);
  };

  // Format time
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="dashboard bg-[#F1F2F6]">
      <div className="mb-10 grid grid-cols-3 gap-6 max-md:grid-cols-1 max-sm:grid-cols-1">
        {/* First card: Time and date info */}
        <div className="rounded-2xl bg-white p-5">
          <div className="flex items-center gap-3 pt-5">
            <img src={Sun} alt="Sun Icon" />
            <div>
              <p className="text-xl text-[#C8CAD5]">{formatTime(time)}</p>
              <p className="text-xs text-[#C8CAD5]">Realtime Insight</p>
            </div>
          </div>
          <div>
            <p className="text-lg">Today:</p>
            <p className="text-lg">{formatDate(time)}</p>
          </div>
        </div>

        {/* Second card: Contests count */}
        <div className="rounded-2xl bg-white p-5">
          <p className="text-sm">Total Contests</p>

          <div className="flex items-center justify-between h-full">
            <h1 className="text-[38px] font-extralight">
              {isLoading ? <span>Loading...</span> : contests?.length || 0}
            </h1>
          </div>
        </div>

        {/* Third card: Users count */}
        <div className="rounded-2xl bg-white p-5">
          <p className="text-sm">Total Users</p>

          <div className="flex items-center justify-between h-full">
            <h1 className="text-[38px] font-extralight">0</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
