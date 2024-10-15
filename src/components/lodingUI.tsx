import { Box, CircularProgress } from "@mui/material";

const LodingUI = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px", // 적절한 높이로 조정하세요
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LodingUI;
