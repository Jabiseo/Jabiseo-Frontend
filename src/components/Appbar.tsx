"use client";
import HamburgerIcon from "@/public/icons/fluent_list-16-filled.svg";
import { AppBar, Box, Button, ThemeProvider, Toolbar } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import useAppbarState from "../hooks/useAppbarState";
import AppbarToolbarUI from "./appbarToolbarUI";
import AppbarDrawer from "./appbarDrawer";
import { globalTheme } from "./globalStyle";
const Appbar = () => {
  const { isLogin, certificate } = useAppbarState();
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  return (
    <ThemeProvider theme={globalTheme}>
      <AppBar
        position="fixed"
        sx={{
          backgroundImage: "url('/headerImage.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingX: {
            xs: 2,
            md: 6,
          },
          boxShadow: "none",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          minHeight: "64px",
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
            />
            <Box
              onClick={toggleDrawer(true)}
              sx={{ display: { sm: "flex", md: "none" }, cursor: "pointer" }}
            >
              <Image src={HamburgerIcon} alt="menu" width={24} height={24} />
            </Box>
          </Toolbar>
          <AppbarDrawer
            open={open}
            toggleDrawer={toggleDrawer}
            isLogin={isLogin}
            handleLogout={handleLogout}
          />
        </Box>
      </AppBar>
    </ThemeProvider>
  );
};

export default Appbar;
