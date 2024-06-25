import { Box, Container, Grid } from "@mui/material";
import Appbar from "@/src/components/Appbar";

interface GridBaseProps {
  sideleft?: React.ReactNode;
  main: React.ReactNode;
  sideright?: React.ReactNode;
}

const GridBase: React.FC<GridBaseProps> = ({ sideleft, main, sideright }) => {
  return (
    <Container maxWidth={false}>
      <Appbar />
      <Box
        sx={{
          width: "100%",
          maxWidth: "1920px",
          minWidth: "320px",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item sm={0} lg={1}>
            <Box
              sx={{
                height: { sm: "0", lg: "100vh" },
                display: { sm: "none", lg: "block" },
              }}
            >
              {sideleft}
            </Box>
          </Grid>
          <Grid item sm={12} lg={10} sx={{ width: "100%" }}>
            {main}
          </Grid>
          <Grid item sm={0} lg={1}>
            <Box
              sx={{
                height: { sm: "0", lg: "100vh" },
                display: { sm: "none", lg: "block" },
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
