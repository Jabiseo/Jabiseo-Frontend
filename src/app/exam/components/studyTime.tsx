"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface StudyTimeProps {
  handleViewTime: (viewTime: string) => void;
  handleTime: (time: number) => void;
}

const StudyTime = ({ handleViewTime, handleTime }: StudyTimeProps) => {
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
    handleTime(elapsedTime);
  }, [elapsedTime]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        fontSize={{
          xs: "12px",
          sm: "20px",
        }}
      >
        경과시간:&nbsp;
      </Typography>
      <Typography
        variant="h4"
        fontSize={{
          xs: "12px",
          sm: "20px",
        }}
        minWidth="80px"
      >
        {viewTime}
      </Typography>
    </Box>
  );
};

export default StudyTime;
