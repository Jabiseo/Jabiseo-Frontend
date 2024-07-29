"use client";

import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface StudyTimeProps {
  handleViewTime: (viewTime: string) => void;
}

const StudyTime = ({ handleViewTime }: StudyTimeProps) => {
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [viewTime, setViewTime] = useState("00분 00초");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      setElapsedTime(Math.floor((currentTime - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const secondsToMMSS = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? `${minutes}` : minutes}분 ${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }초`;
  };

  useEffect(() => {
    const time = secondsToMMSS(elapsedTime);
    setViewTime(time);
    handleViewTime(time);
  }, [elapsedTime]);

  return (
    <>
      <Typography
        variant="h4"
        fontSize={{
          xs: "12px",
          md: "20px",
        }}
      >
        경과시간: {viewTime}
      </Typography>
    </>
  );
};

export default StudyTime;
