import CircleNumber1 from "@/public/icons/circle-number1.svg";
import CircleNumber2 from "@/public/icons/circle-number2.svg";
import CircleNumber3 from "@/public/icons/circle-number3.svg";
import CircleNumber4 from "@/public/icons/circle-number4.svg";
import { globalTheme } from "@/src/components/globalStyle";
import { Box, ThemeProvider, Typography } from "@mui/material";
interface OmrProps {
  setProblemNumber: (number: number) => void;
  problems: ProblemViewType[];
  chooseAnswer: (number: number, chooseProblemNumber: number) => void;
}

const Omr: React.FC<OmrProps> = ({ setProblemNumber, problems, chooseAnswer }: OmrProps) => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Box
        minHeight="100vh"
        width="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
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
          }}
        >
          <Typography color={"white"} variant="h1" fontSize={"18px"}>
            OMR 표기란
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: "20%",
              minHeight: "823px",
              height: "100%",
              backgroundColor: "var(--c-gray2)",
            }}
          >
            {problems.map((problem, index) => (
              <Box
                sx={{
                  backgroundColor: "var(--c-gray2)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "32px",
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
                  }}
                >
                  {problem.problemNumber}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              width: "80%",
              minHeight: "823px",
              height: "100%",
            }}
          >
            {problems.map((problem, index) => (
              <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                {problem.choices.map((choice, idx) => (
                  <Box
                    sx={{
                      height: "32px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setProblemNumber(index + 1);
                      chooseAnswer(idx + 1, index + 1);
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: problem.chooseNumber - 1 === idx ? "var(--c-gray2)" : "",
                        borderRadius: 9999,
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {idx === 0 ? (
                        <CircleNumber1 width={28} height={28} />
                      ) : idx === 1 ? (
                        <CircleNumber2 width={28} height={28} />
                      ) : idx === 2 ? (
                        <CircleNumber3 width={28} height={28} />
                      ) : idx === 3 ? (
                        <CircleNumber4 width={28} height={28} />
                      ) : null}
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Omr;
