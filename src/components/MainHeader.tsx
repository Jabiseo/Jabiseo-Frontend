"use client";

import { Box, Typography, ThemeProvider } from "@mui/material";
import { globalTheme } from "./globalStyle";

const MainHeader = () => {
  return (
    <>
      <ThemeProvider theme={globalTheme}>
        <Box
          sx={{
            mt: {
              xs: "56px",
              sm: "64px",
            },
            padding: "0",
            backgroundImage: "url('/headerImage.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: {
              xs: "200px",
              sm: "300px",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "8px",
              width: "80%",
            }}
          >
            <Typography
              variant="h1"
              sx={{ color: "white" }}
              fontSize={{
                xs: "28px",
                sm: "32px",
              }}
            >
              지금 자비서와 함께
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: "white" }}
              fontSize={{
                xs: "28px",
                sm: "32px",
              }}
            >
              스마트한 자격증 취득을 시작하세요
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default MainHeader;
