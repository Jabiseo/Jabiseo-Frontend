import { ThemeProvider } from "@emotion/react";
import { globalTheme } from "../../../components/globalStyle";
import { Box, Typography } from "@mui/material";

const LearningHeader = () => {
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
            minHeight: "180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "8px",
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
              쉽고 편리하게
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: "white" }}
              fontSize={{
                xs: "28px",
                sm: "32px",
              }}
            >
              공부할 수 있는 자비서
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default LearningHeader;
