"use client";
import { useEffect, useState } from "react";

import { globalTheme } from "@/src/components/globalStyle";
import ScrollAppbar from "@/src/components/scrollAppbar";
import { Box, ThemeProvider } from "@mui/material";

import FooterBox from "./components/footerBox";
import MainBody from "./components/mainBody";
import MainFooter from "./components/mainFooter";
import MainHeader from "./components/MainHeader";
import PreFooterBody from "./components/preFooterBody";

export default function Home() {
  const [isScroll, setisScroll] = useState(0);

  const handleScroll = () => {
    setisScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <ThemeProvider theme={globalTheme}>
      <ScrollAppbar isScroll={isScroll} />
      <MainHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <MainBody />
      </Box>
      <PreFooterBody />
      <FooterBox />
      <MainFooter />
    </ThemeProvider>
  );
}
