"use client";

import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const StudyTime = () => {
  const [time, setTime] = useState(0);
  const [viewTime, setViewTime] = useState("00분 00초");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const secondsToMMSS = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? `${minutes}` : minutes}분 ${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }초`;
  };

  useEffect(() => {
    setViewTime(secondsToMMSS(time));
  }, [time]);
  return (
    <>
      <Typography
        variant="h4"
        fontSize={{
          xs: "14px",
          sm: "20px",
        }}
      >
        경과시간: {viewTime}
      </Typography>
    </>
  );
};

export default StudyTime;
