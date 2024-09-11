"use client";
import { Box, Typography } from "@mui/material";

const ProblemHeader = ({ certificateName }: { certificateName: string }) => {
  return (
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
        sx={{ marginBottom: "30px" }}
      >
        문제 상세 정보
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
  );
};
export default ProblemHeader;
