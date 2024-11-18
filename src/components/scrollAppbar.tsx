"use client";
import HamburgerIcon from "@/public/icons/hamburger.svg";
import { AppBar, Box, ThemeProvider, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import useAppbarState from "../hooks/useAppbarState";
import AppbarDrawer from "./appbarDrawer";
import AppbarToolbarUI from "./appbarToolbarUI";
import { globalTheme } from "./globalStyle";
import { mainfetch } from "../api/apis/mainFetch";
const ScrollAppbar = ({ isScroll }: { isScroll?: number }) => {
  const { isLogin, certificate, focusTap, userInfo } = useAppbarState();
  const [open, setOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [fontColor, setFontColor] = useState("white");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // certificate가 로드되었을 때 로딩 상태를 false로 변경
    if (certificate !== undefined) {
      setIsLoading(false);
    }
  }, [certificate]);

  useEffect(() => {
    if (isScroll === undefined) return;
    if (isScroll >= 40) {
      setBackgroundColor("white");
      setFontColor("black");
    } else {
      setBackgroundColor("transparent");
      setFontColor("white");
    }
  }, [isScroll]);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/auth/logout", {
      method: "POST",
      headers: {
        "X-Device-Id": localStorage.getItem("X-Device-Id") ?? "",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
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
          boxShadow: isScroll && isScroll > 0 ? "rgba(0, 0, 0, 0.2) 0px 0px 14px" : "none",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          minHeight: "64px",
          backgroundColor: backgroundColor,
          transition: "all 0.3s",
          boxSizing: "border-box",
        }}
      >
        <Box
          maxWidth="1140px"
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
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
              isScroll={isScroll}
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
          <AppbarDrawer
            open={open}
            toggleDrawer={toggleDrawer}
            isLogin={isLogin}
            handleLogout={handleLogout}
            userInfo={userInfo}
          />
        </Box>
      </AppBar>
    </ThemeProvider>
  );
};

export default ScrollAppbar;
