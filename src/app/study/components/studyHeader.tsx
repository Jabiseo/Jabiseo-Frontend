"use client";
import { globalTheme } from "@/src/components/globalStyle";
import { Box, ThemeProvider, Typography } from "@mui/material";

const StudyHeader = ({ certificateName }: { certificateName: string }) => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Box
        sx={{
          marginTop: "64px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          minHeight: {
            xs: "100px",
            sm: "180px",
          },
          backgroundColor: "var(--c-sub5)",
        }}
      >
        <Typography
          variant="h1"
          fontSize={{
            xs: "16px",
            sm: "28px",
          }}
          color="white"
          sx={{ marginBottom: 1 }}
        >
          공부 모드
        </Typography>
        <Typography
          variant="h4"
          fontSize={{
            xs: "14px",
            sm: "24px",
          }}
          color="white"
        >
          {certificateName}
        </Typography>
      </Box>
    </ThemeProvider>
  );
};
export default StudyHeader;
