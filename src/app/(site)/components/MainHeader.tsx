"use client";

import { Box, Button, Typography } from "@mui/material";

const MainHeader = () => {
  return (
    <Box
      sx={{
        padding: "0",
        backgroundImage: "url('/headerImage.avif')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: {
          xs: "400px",
          sm: "500px",
          md: "650px",
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "100%",
          maxWidth: "1165px",
          paddingX: {
            xs: "22px",
            sm: "25px",
          },
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h1"
          sx={{ color: "white" }}
          fontSize={{
            xs: "20px",
            sm: "28px",
            md: "40px",
          }}
          marginBottom={{
            xs: "12px",
            sm: "16px",
            md: "24px",
          }}
        >
          지금 자비서와 함께
        </Typography>
        <Typography
          variant="h1"
          sx={{ color: "white" }}
          fontSize={{
            xs: "20px",
            sm: "28px",
            md: "40px",
          }}
        >
          스마트한 자격증 취득을 시작하세요
        </Typography>
        <Button
          href="/learning"
          disableRipple
          sx={{
            backgroundColor: "white",
            borderRadius: "40px",
            padding: {
              xs: "12px 24px",
              sm: "20px 48px",
            },
            "&:hover": {
              backgroundColor: "white",
            },
            marginTop: {
              xs: "30px",
              sm: "60px",
              md: "104px",
            },
          }}
        >
          <Typography
            variant="h1"
            color="var(--c-sub4)"
            fontSize={{
              xs: "16px",
              sm: "26px",
            }}
          >
            공부 시작하기
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default MainHeader;
