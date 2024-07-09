"use client";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { globalTheme } from "./globalStyle";
import { IoMdClose } from "react-icons/io";
import { IoPersonCircleSharp } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
const logoStyle = {
  width: "23px",
  height: "auto",
  cursor: "pointer",
};
const Appbar = () => {
  const [open, setOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  return (
    <ThemeProvider theme={globalTheme}>
      <AppBar
        position="fixed"
        sx={{
          backgroundImage: "url('/headerImage.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingX: {
            xs: 1,
            sm: 6,
          },
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ display: "flex", alignItems: "center" }}>
              <Button href="/">
                <img
                  src="https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                  alt="Sitemark"
                  style={logoStyle}
                />
                <Typography variant="h1" sx={{ color: "white", ml: 2 }} fontSize={"24px"}>
                  자비서
                </Typography>
              </Button>
              <Button sx={{ color: "black", display: { xs: "none", sm: "flex" } }} href="/learning">
                <Typography variant="subtitle1" sx={{ color: "white", ml: 2 }} fontSize={"16px"}>
                  문제풀이
                </Typography>
              </Button>
              <Button sx={{ color: "black", display: { xs: "none", sm: "flex" } }} href="/bookmark">
                <Typography variant="subtitle1" sx={{ color: "white", ml: 2 }} fontSize={"16px"}>
                  북마크
                </Typography>
              </Button>
            </Typography>
          </Box>
          {!isLogin ? (
            <Button
              variant="contained"
              sx={{
                marginLeft: 2,
                backgroundColor: "white",
                display: { xs: "none", sm: "flex" },
                borderRadius: "10px",
                border: "1px solid var(--c-main)",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "white",
                  boxShadow: "none",
                },
              }}
              href="/login"
            >
              <Typography variant="h4" fontSize={"16px"} color="var(--c-main)">
                로그인
              </Typography>
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{
                  marginLeft: 2,
                  backgroundColor: "white",
                  display: { xs: "none", sm: "flex" },
                  borderRadius: "10px",
                  border: "1px solid var(--c-main)",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "white",
                    boxShadow: "none",
                  },
                }}
                href="/login"
              >
                <Typography variant="h4" fontSize={"16px"} color="var(--c-main)">
                  로그아웃
                </Typography>
              </Button>
              <IconButton sx={{ marginLeft: 2, display: { xs: "none", sm: "flex" } }}>
                <Avatar alt="User" src="user-avatar.jpg" />
              </IconButton>
            </>
          )}

          <Box sx={{ display: { xs: "", sm: "none" } }}>
            {
              // Mobile View
              isLogin ? (
                <Button
                  sx={{
                    marginRight: 1,
                    backgroundColor: "white",
                    borderRadius: "30px",
                    border: "1px solid var(--c-main)",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "white",
                      boxShadow: "none",
                    },
                  }}
                  href="/login"
                >
                  <Typography variant="h4" fontSize={"14px"} color="var(--c-main)">
                    로그아웃
                  </Typography>
                </Button>
              ) : (
                <Button
                  sx={{
                    marginRight: 1,
                    backgroundColor: "white",
                    borderRadius: "30px",
                    border: "1px solid var(--c-main)",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "white",
                      boxShadow: "none",
                    },
                  }}
                  href="/login"
                >
                  <Typography variant="h4" fontSize={"14px"} color="var(--c-main)">
                    로그인
                  </Typography>
                </Button>
              )
            }
            <Button
              variant="text"
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: "30px", p: "4px" }}
            >
              <MenuIcon />
            </Button>

            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: "100dvw",
                  p: 3,
                  backgroundColor: "var(--c-gray1)",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: 2,
                    mb: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                      alt="Sitemark"
                      style={logoStyle}
                    />
                    <Typography variant="h1" sx={{ ml: 2 }} fontSize={"24px"}>
                      자비서
                    </Typography>
                  </Box>
                  <IoMdClose size={28} onClick={toggleDrawer(false)} />
                </Box>

                <Box>
                  {isLogin ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton>
                        <Avatar alt="User" src="user-avatar.jpg" />
                      </IconButton>
                      <Typography variant="h4" fontSize={"16px"} color="var(--c-gray5)">
                        닉네임입니다
                      </Typography>
                    </Box>
                  ) : (
                    <Button
                      variant="text"
                      component="a"
                      href="/login"
                      target="_blank"
                      sx={{
                        width: "100%",
                        backgroundColor: "var(--c-sub5)",
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "var(--c-sub5)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IoPersonCircleSharp size={24} color="#CCCCCC" />
                        <Typography variant="subtitle1" fontSize={"14px"} color="white" ml={1}>
                          로그인을 해주세요
                        </Typography>
                      </Box>
                      <SlArrowRight size={16} color="white" />
                    </Button>
                  )}
                </Box>
                <Typography
                  variant="body2"
                  fontSize={"14px"}
                  color={"var(--c-gray4)"}
                  sx={{ mt: 4, mb: 2 }}
                >
                  카테고리
                </Typography>
                <Divider />

                <Box
                  sx={{
                    py: 3,
                    textDecoration: "none",
                  }}
                  component={"a"}
                  href="/learning"
                >
                  <Typography variant="h4" fontSize={"18px"} color="var(--c-gray5)">
                    문제풀이
                  </Typography>
                </Box>
                <Box
                  sx={{
                    py: 3,
                    textDecoration: "none",
                  }}
                  component={"a"}
                  href="/bookmark"
                >
                  <Typography variant="h4" fontSize={"18px"} color="var(--c-gray5)">
                    북마크
                  </Typography>
                </Box>
                {!isLogin || (
                  <Box
                    sx={{
                      py: 3,
                      textDecoration: "none",
                    }}
                    component={"a"}
                    href="/mypage"
                  >
                    <Typography variant="h4" fontSize={"18px"} color="var(--c-gray5)">
                      마이페이지
                    </Typography>
                  </Box>
                )}
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Appbar;
