"use client";

import KakaoButton from "./components/KakaoButton";
import GoogleButton from "./components/GoogleButton";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          padding: isSmallScreen ? "1rem" : "2rem",
          bgcolor: "#f7f7f5ff",
          transition: "all 0.5s",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: isSmallScreen ? "1rem" : "2rem",
            minWidth: "320px",
            maxWidth: "720px",
            width: "60%",
            height: "70%",
            minHeight: "380px",
            maxHeight: "640px",
            bgcolor: "white",
            borderRadius: "12px",
          }}
        >
          <Box
            sx={{
              m: isSmallScreen ? "1rem" : "2rem",
              textAlign: isSmallScreen ? "center" : "left",
            }}
          >
            <Typography variant={isSmallScreen ? "h5" : "h3"} fontWeight={500}>
              나만을 위한 자격증{" "}
            </Typography>
            <Typography variant={isSmallScreen ? "h5" : "h3"} align="center" fontWeight={500}>
              AI 비서{" "}
              <Typography fontWeight={800} component="span" variant={isSmallScreen ? "h4" : "h2"}>
                자비서
              </Typography>
            </Typography>
          </Box>
          <KakaoButton />
          <br />
          <GoogleButton />
        </Box>
      </Box>
    </>
  );
};

export default Login;
