import { globalTheme } from "@/src/components/globalStyle";
import { Box, Grid, ThemeProvider, Typography } from "@mui/material";
import { Bs1Circle, Bs2Circle, Bs3Circle, Bs4Circle, Bs5Circle } from "react-icons/bs";

interface OmrProps {
  handleOmrModal: () => void;
  setProblemNumber: (number: number) => void;
  problems: ProblemViewType[];
  chooseAnswer: (number: number, chooseProblemNumber: number) => void;
}

const SmallOmrUI: React.FC<OmrProps> = ({
  handleOmrModal,
  setProblemNumber,
  problems,
  chooseAnswer,
}: OmrProps) => {
  const circles = [Bs1Circle, Bs2Circle, Bs3Circle, Bs4Circle, Bs5Circle];
  return (
    <ThemeProvider theme={globalTheme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "10px 10px 0px 0px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "var(--c-sub5)",
              paddingY: 2,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px 10px 0px 0px",
            }}
          >
            <Typography color={"white"} variant="h1" fontSize={"18px"}>
              OMR 표기란
            </Typography>
          </Box>
        </Box>
        <Grid container>
          {problems.map((problem, index) => (
            <Grid item xs={6} key={problem.problemId}>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  flexDirection: "row",
                }}
              >
                <Grid
                  item
                  xs={2}
                  sx={{
                    backgroundColor: "var(--c-gray2)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 1,
                  }}
                >
                  <Typography
                    variant="h3"
                    fontSize={{
                      xs: "14px",
                      sm: "16px",
                    }}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => {
                      setProblemNumber(index + 1);
                      handleOmrModal();
                    }}
                  >
                    {problem.problemNumber}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}
                >
                  {problem.choices.map((choice, idx) => (
                    <Box
                      sx={{
                        backgroundColor: problem.chooseNumber - 1 === idx ? "var(--c-gray2)" : "",
                        borderRadius: 9999,
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={() => {
                        chooseAnswer(idx + 1, index + 1);
                        setProblemNumber(index + 1);
                        handleOmrModal();
                      }}
                    >
                      {circles[idx].call(null, { size: 20 })}
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
export default SmallOmrUI;
