import { Box, Typography } from "@mui/material";

const BiseoChoice = () => {
  return (
    <Box
      sx={{
        padding: "10px 16px",
        borderRadius: "20px",
        backgroundColor: "#ffffff50",
        zIndex: 1000,
        filter: "drop-shadow(0px 1px 12px rgba(0, 0, 0, 0.16))",
        backdropFilter: "blur(8px)",
        width: "180px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <Typography
        component="a"
        href="/analysis"
        color="var(--c-sub5)"
        variant="subtitle1"
        fontSize="16px"
        marginRight="16px"
        sx={{ textDecoration: "none" }}
        onClick={() => {
          localStorage.setItem("focusTap", "학습비서");
        }}
      >
        학습분석
      </Typography>
      <Typography
        component="a"
        href="/studyplan"
        color="var(--c-sub5)"
        variant="subtitle1"
        fontSize="16px"
        sx={{ textDecoration: "none" }}
        onClick={() => {
          localStorage.setItem("focusTap", "학습비서");
        }}
      >
        학습플랜
      </Typography>
    </Box>
  );
};

export default BiseoChoice;
