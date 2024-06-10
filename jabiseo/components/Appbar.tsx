"use client";
import * as React from "react";
import { PaletteMode } from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

interface AppAppBarProps {
  mode: PaletteMode;
}

function AppAppBar({ mode }: AppAppBarProps) {
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
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={theme => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <img
                src={
                  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                }
                style={logoStyle}
                alt="logo of sitemark"
              />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography variant="body1" color="text.primary">
                    문제풀이
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography variant="body1" color="text.primary">
                    북마크
                  </Typography>
                </MenuItem>
                {!isLogin || (
                  <MenuItem sx={{ py: "6px", px: "12px" }}>
                    <Typography variant="body1" color="text.primary">
                      마이페이지
                    </Typography>
                  </MenuItem>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {" "}
              {isLogin ? (
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component="a"
                  href="/material-ui/getting-started/templates/sign-in/"
                  target="_blank"
                >
                  로그아웃
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  href="/login"
                  target="_blank"
                >
                  로그인
                </Button>
              )}
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
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
                        sx={{ width: "100%", fontSize: "1.5rem" }}
                      >
                        로그인
                      </Button>
                    </MenuItem>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
