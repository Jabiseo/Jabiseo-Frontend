"use client";
import HamburgerIcon from "@/public/icons/hamburger.svg";
import { AppBar, Box, ThemeProvider, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import useAppbarState from "../hooks/useAppbarState";
import AppbarDrawer from "./appbarDrawer";
import AppbarToolbarUI from "./appbarToolbarUI";
import { globalTheme } from "./globalStyle";
import { mainfetch } from "../api/apis/mainFetch";
const Appbar = () => {
  const { isLogin, certificate, focusTap } = useAppbarState();
  const [open, setOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [fontColor, setFontColor] = useState("black");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // certificate가 로드되었을 때 로딩 상태를 false로 변경
    if (certificate !== undefined) {
      setIsLoading(false);
    }
  }, [certificate]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    await mainfetch(
      "/auth/logout",
      {
        method: "POST",
      },
      true
    );
    window.location.href = "/";
  };

  if (isLoading) {
    return null; // 또는 로딩 인디케이터를 표시
  }

  return (
    <ThemeProvider theme={globalTheme}>
      <AppBar
        position="fixed"
        sx={{
          paddingX: "25px",
          boxShadow: "none",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          minHeight: "64px",
          backgroundColor: backgroundColor,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            maxWidth: "1165px",
          }}
        >
          <Toolbar
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              "&.MuiToolbar-root": {
                padding: 0,
              },
            }}
          >
            <AppbarToolbarUI
              isLogin={isLogin}
              handleLogout={handleLogout}
              certificate={certificate}
              fontColor={fontColor}
              focusTap={focusTap}
            />
            <Box
              onClick={toggleDrawer(true)}
              sx={{
                display: { xs: "flex", md: "none" },
                cursor: "pointer",
                minHeight: 0,
                minWidth: 0,
                padding: 0,
              }}
            >
              <HamburgerIcon width={24} height={24} color="black" />
            </Box>
          </Toolbar>
        </Box>
        <AppbarDrawer
          open={open}
          toggleDrawer={toggleDrawer}
          isLogin={isLogin}
          handleLogout={handleLogout}
        />
      </AppBar>
    </ThemeProvider>
  );
};

export default Appbar;
