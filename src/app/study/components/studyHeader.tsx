import { Box, Typography } from "@mui/material";

const StudyHeader = () => {
  const certificate = JSON.parse(localStorage.getItem("certificate")!);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: {
            xs: "80px",
            sm: "154px",
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
          {certificate.name}
        </Typography>
      </Box>
    </>
  );
};
export default StudyHeader;
