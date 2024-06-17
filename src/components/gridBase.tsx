import { Box, Container, Grid } from "@mui/material";
import Appbar from "@/src/components/Appbar";

interface GridBaseProps {
  sideleft?: React.ReactNode;
  main: React.ReactNode;
  sideright?: React.ReactNode;
}

const GridBase: React.FC<GridBaseProps> = ({ sideleft, main, sideright }) => {
  return (
    <Container maxWidth={false} disableGutters>
      <Appbar />
      <Box
        sx={{
          margin: "0 auto",
          maxWidth: "1440px",
          minWidth: "320px",
          paddingX: { xs: "20px", sm: "40px", md: "60px" },
          marginTop: "90px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={0} md={2}>
            <Box
              sx={{
                height: { xs: "0", md: "100vh" },
                display: { xs: "none", md: "block" },
              }}
            >
              {sideleft}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            {main}
          </Grid>
          <Grid item xs={0} md={2}>
            <Box
              sx={{
                height: { xs: "0", md: "100vh" },
                display: { xs: "none", md: "block" },
              }}
            >
              {sideright}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default GridBase;
