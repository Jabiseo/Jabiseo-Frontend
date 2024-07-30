"use client";
import Appbar from "@/src/components/Appbar";
import { useMediaQuery, useTheme } from "@mui/material";

import BookMarkMain from "./bookMarkMain";
import MobileBookMarkMain from "./mobileBookMarkMain";
import { useEffect } from "react";

const BookMarkSize = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(960));
  useEffect(() => {
    localStorage.setItem("focusTap", "북마크");
  });
  return (
    <>
      <Appbar />
      {isMobile ? <MobileBookMarkMain /> : <BookMarkMain />}
    </>
  );
};

export default BookMarkSize;
