"use client";

import KakaoButton from "./components/KakaoButton";
import GoogleButton from "./components/GoogleButton";
import { Box, Typography } from "@mui/material";

const Login = () => {
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
        }}
      >
        <Box
          sx={{
            m: "2rem",
          }}
        >
          <Typography variant="h4" fontWeight={500}>
            나만을 위한 자격증{" "}
          </Typography>
          <Typography variant="h4" align="center" fontWeight={500}>
            AI 비서{" "}
            <Typography fontWeight={800} component="span" variant="h4">
              자비서
            </Typography>
          </Typography>
        </Box>
        <KakaoButton />
        <br />
        <GoogleButton />
      </Box>
    </>
  );
};
export default Login;
