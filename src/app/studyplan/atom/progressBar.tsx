import { Box } from "@mui/material";

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <Box
      sx={{
        width: {
          xs: "168px",
          sm: "194px",
        },
        height: {
          xs: "8px",
          sm: "12px",
        },
        borderRadius: "30px",
        backgroundColor: "#f2f2f2",
      }}
    >
      <Box
        sx={{
          width: `${progress}%`,
          height: "100%",
          borderRadius: "30px",
          backgroundColor: "var(--c-main)",
        }}
      ></Box>
    </Box>
  );
};

export default ProgressBar;
