"use client";
import { Box, Container, Grid } from "@mui/material";
import MakeProblemSetUI from "./components/MakeProblemSet";
import Appbar from "@/src/components/Appbar";

const makeProblemSetBase = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <Appbar />
      <Box
        sx={{
          margin: "0 auto",
          maxWidth: "1440px",
          paddingX: { xs: "20px", sm: "40px", md: "60px" },
          marginTop: "90px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={0} md={2}>
            <Box
              sx={{
                // bgcolor: "primary.main",
                height: { xs: "0", md: "100vh" },
                display: { xs: "none", md: "block" },
              }}
            ></Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <MakeProblemSetUI />
          </Grid>
          <Grid item xs={0} md={2}>
            <Box
              sx={{
                // bgcolor: "primary.main",
                height: { xs: "0", md: "100vh" },
                display: { xs: "none", md: "block" },
              }}
            ></Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default makeProblemSetBase;
