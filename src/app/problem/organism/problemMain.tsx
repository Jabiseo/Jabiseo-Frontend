import { mainfetch } from "@/src/api/apis/mainFetch";
import { Box, Grid, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useCallback, useState } from "react";
import SolutionUI from "../molecule/solutionUI";
import ProblemUI from "./problemUI";
import SimilarProblemList from "./similarProblemList";
import handleBookmarkModule from "@/src/api/apis/handleBookmark";

interface ProblemMainProps {
  problem: ProblemDetailType;
  setProblem: React.Dispatch<React.SetStateAction<ProblemDetailType>>;
  goToSimilarProblem: (problemId: number) => void;
}
const ProblemMain = ({ problem, setProblem, goToSimilarProblem }: ProblemMainProps) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(prev => prev ^ 1);
  };

  const chooseAnswer = (answer: number) => {
    setProblem(prev => ({ ...prev, chooseNumber: answer }));
  };

  const handleBookmark = useCallback(
    (problem: BookMarkProblem) => {
      handleBookmarkModule<ProblemDetailType>(
        problem,
        isProcessing,
        setIsProcessing,
        undefined,
        setProblem
      );
    },
    [isProcessing, setIsProcessing, setProblem]
  );

  return (
    <Box
      sx={{
        maxWidth: "1165px",
        width: "100%",

        boxSizing: "border-box",
        marginBottom: "110px",
      }}
    >
      <Box
        sx={{
          margin: "0 auto",
          maxWidth: "1140px",
          minWidth: "320px",
        }}
      >
        <Grid container minHeight="60vh">
          <Grid item xs={12} md={6} borderRight={isMd ? "none" : "1px dotted var(--c-gray3)"}>
            <ProblemUI
              problem={problem}
              setProblem={setProblem}
              chooseAnswer={chooseAnswer}
              isSm={isSm}
              handleBookmark={handleBookmark}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              centered
              variant="fullWidth"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "var(--c-sub3)",
                },
              }}
            >
              <Tab
                label={
                  <Typography variant="h4" fontSize="16px">
                    해설
                  </Typography>
                }
                sx={{ flex: 1 }}
              />
              <Tab
                label={
                  <Typography variant="h4" fontSize="16px">
                    유사문제
                  </Typography>
                }
                sx={{ flex: 1 }}
              />
            </Tabs>
            {problem &&
              (tabValue === 0 ? (
                <SolutionUI solution={problem.solution} />
              ) : (
                <SimilarProblemList
                  similarProblems={problem.similarProblems}
                  goToSimilarProblem={goToSimilarProblem}
                />
              ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default ProblemMain;
