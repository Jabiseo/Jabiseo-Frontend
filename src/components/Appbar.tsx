import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Divider, Drawer, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const logoStyle = {
  width: "140px",
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
    <div>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 2px 3px 0px rgba(0,0,0,0.14)",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                alt="Sitemark"
                style={logoStyle}
              />
            </Typography>
          </Box>
          <Button sx={{ color: "black", display: { xs: "none", sm: "flex" } }} href="/">
            홈
          </Button>
          <Button sx={{ color: "black", display: { xs: "none", sm: "flex" } }} href="/learning">
            문제풀이
          </Button>
          <Button sx={{ color: "black", display: { xs: "none", sm: "flex" } }} href="/bookmark">
            북마크
          </Button>
          {!isLogin ? (
            <Button
              variant="contained"
              sx={{
                marginLeft: 2,
                backgroundColor: "var(--c-green)",
                display: { xs: "none", sm: "flex" },
              }}
            >
              로그인
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                marginLeft: 2,
                backgroundColor: "var(--c-green)",
                display: { xs: "none", sm: "flex" },
              }}
            >
              로그아웃
            </Button>
          )}

          <IconButton sx={{ marginLeft: 2 }}>
            <Avatar alt="User" src="user-avatar.jpg" />
          </IconButton>
          <Box sx={{ display: { xs: "", sm: "none" } }}>
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
    </div>
  );
};

export default Appbar;
