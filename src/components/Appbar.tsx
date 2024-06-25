"use client";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Drawer, MenuItem, ThemeProvider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { globalTheme } from "./globalStyle";
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
    const token = localStorage.getItem("token");
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
                }}
              >
                로그아웃
              </Button>
              <IconButton sx={{ marginLeft: 2 }}>
                <Avatar alt="User" src="user-avatar.jpg" />
              </IconButton>
            </>
          )}

          <Box sx={{ display: { xs: "", sm: "none" } }}>
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
                  minWidth: "60dvw",
                  p: 2,
                  backgroundColor: "background.paper",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MenuItem
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  문제풀이
                </MenuItem>
                <MenuItem
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  북마크
                </MenuItem>
                {!isLogin || (
                  <MenuItem
                    sx={{
                      fontSize: "1.5rem",
                    }}
                  >
                    마이페이지
                  </MenuItem>
                )}
                <Divider />
                {isLogin ? (
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="text"
                      component="a"
                      href="/logout"
                      target="_blank"
                      sx={{ width: "100%", fontSize: "1.5rem" }}
                    >
                      로그아웃
                    </Button>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/login"
                      target="_blank"
                      sx={{ width: "100%", fontSize: "1.5rem", backgroundColor: "var(--c-green)" }}
                    >
                      로그인
                    </Button>
                  </MenuItem>
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
