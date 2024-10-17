import { Box } from "@mui/material";
import MainBodyMd from "./mainBodyMd";
import MainBodyXS from "./mainBodyXS";
const MainBody = () => {
  return (
    <Box
      sx={{
        marginTop: {
          xs: "30px",
          sm: "60px",
          md: "100px",
        },
        width: "100%",
        maxWidth: "1165px",
        paddingX: {
          xs: "22px",
          sm: "25px",
        },
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MainBodyXS />
      <MainBodyMd />
    </Box>
  );
};

export default MainBody;
