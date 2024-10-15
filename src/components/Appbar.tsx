"use client";
import HamburgerIcon from "@/public/icons/hamburger.svg";
import { AppBar, Box, ThemeProvider, Toolbar } from "@mui/material";
import { useState } from "react";
import { mainfetch } from "../api/apis/mainFetch";
import useAppbarState from "../hooks/useAppbarState";
import AppbarDrawer from "./appbarDrawer";
import AppbarToolbarUI from "./appbarToolbarUI";
import { globalTheme } from "./globalStyle";
const Appbar = ({ background }: { background?: boolean }) => {
  const { isLogin, certificate, focusTap, userInfo } = useAppbarState();
  const [open, setOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [fontColor, setFontColor] = useState("black");
  const [isLoading, setIsLoading] = useState(true);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    await mainfetch(
      "/auth/logout",
      {
        method: "POST",
      },
      true
    );
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };

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
          backgroundImage: background ? "url('/appbarImage.png')" : "none",
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
              fontColor={background ? "white" : "black"}
              focusTap={focusTap}
              isScroll={background ? 30 : 50}
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
          userInfo={userInfo}
        />
      </AppBar>
    </ThemeProvider>
  );
};

export default Appbar;
