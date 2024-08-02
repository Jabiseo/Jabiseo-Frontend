"use client";

import { mainfetch } from "@/src/api/apis/mainFetch";
import { globalTheme } from "@/src/components/globalStyle";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Modal,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ProblemNumberList from "../components/problemNumberList";
import ProblemUI from "../components/problemUI";
import SolutionUI from "../components/solutionUI";
import StudyFooterUI from "./studyFooterUI";
import StudyInfoUI from "./studyInfoUI";
import SubmitResultUI from "./submitResultUI";

interface StudyMainUIProps {
  getProblems: ProblemViewType[];
  loading: boolean;
  error: string | null;
}

const StudyMainUI: React.FC<StudyMainUIProps> = ({ getProblems, loading, error }) => {
  const [problem, setProblem] = useState<ProblemViewType | null>(null);
  const [problems, setProblems] = useState<ProblemViewType[]>([]);
  const [problemNumber, setProblemNumber] = useState<number>(1);
  const [tabValue, setTabValue] = useState(0);
  const [submitModalopen, setSubmitModalOpen] = useState(false);
  const [omrModalopen, setOmrModalOpen] = useState(false);
  const [solvedProblemsNumber, setSolvedProblemsNumber] = useState<string>("");
  const [viewTime, setViewTime] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  // 제출하기 UI상 보일 시간
  const [submitTime, setSubmitTime] = useState<string>("");
  // 결과 제출 시 실제 제출 시간
  const [submitNumberTime, setSubmitNumberTime] = useState<number>();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(prev => prev ^ 1);
  };
  useEffect(() => {
    if (!getProblems) return;
    setProblems(getProblems);
    setProblem(getProblems[problemNumber - 1]);
    setSolvedProblemsNumber("0/" + getProblems.length);
  }, [getProblems]);

  useEffect(() => {
    if (problem && problem.problemId == problems[problemNumber - 1].problemId) return;
    setProblem(problems[problemNumber - 1]);
    setTabValue(0);
  }, [problemNumber, problems]);

  const nextProblem = () => {
    if (problemNumber === problems.length) {
      return;
    }
    setProblemNumber(problemNumber + 1);
  };

  const prevProblem = () => {
    if (problemNumber === 1) {
      return;
    }
    setProblemNumber(problemNumber - 1);
  };

  const chooseAnswer = useCallback(
    (number: number) => {
      setProblem(prev => {
        if (!prev) return null;
        return { ...prev, chooseNumber: number };
      });
      problems[problemNumber - 1].chooseNumber = number;
      let solveProblem = 0;
      problems.forEach(problem => {
        if (problem.chooseNumber != -1) {
          solveProblem++;
        }
      });
      setSolvedProblemsNumber(solveProblem + "/" + problems.length);
    },
    [problems, problem]
  );

  const sendResult = () => {
    localStorage.setItem("problems", JSON.stringify(problems));
    router.push("/result");
  };

  const handleSubmitModal = () => {
    setSubmitModalOpen(!submitModalopen);
    setSubmitTime(viewTime);
    setSubmitNumberTime(time);
  };

  const handleOmrModal = () => {
    setOmrModalOpen(!omrModalopen);
  };

  const handleViewTime = (viewTime: string) => {
    setViewTime(viewTime);
  };

  const handleTime = (time: number) => {
    setTime(time);
  };

  const handleViewSolution = () => {
    setProblem(prev => {
      if (!prev) return null;
      return { ...prev, viewSolution: !prev.viewSolution };
    });
    setProblems(prev => {
      return prev.map(problem => {
        if (problem.problemId === problems[problemNumber - 1].problemId) {
          return { ...problem, viewSolution: !problem.viewSolution };
        }
        return problem;
      });
    });
  };

  const handleViewTheory = () => {
    setProblem(prev => {
      if (!prev) return null;
      return { ...prev, viewTheory: !prev.viewTheory };
    });
    setProblems(prev => {
      return prev.map(problem => {
        if (problem.problemId === problems[problemNumber - 1].problemId) {
          return { ...problem, viewTheory: !problem.viewTheory };
        }
        return problem;
      });
    });
  };

  const handleBookmark = useCallback(
    async (problemId: number) => {
      if (isProcessing) return;
      if (localStorage.getItem("accessToken") === null) {
        return;
      }

      setIsProcessing(true);

      try {
        const targetProblem = problems.find(problem => problem.problemId === problemId);
        if (!targetProblem) throw new Error("Problem not found");
        const method = targetProblem.isBookmark ? "DELETE" : "POST";
        const endpoint = "/bookmarks";

        await mainfetch(
          endpoint,
          {
            method,
            body: {
              problemId,
            },
          },
          true
        );

        setProblems(prevProblems =>
          prevProblems.map(problem =>
            problem.problemId === problemId
              ? { ...problem, isBookmark: !problem.isBookmark }
              : problem
          )
        );
      } catch (error) {
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing, problems, mainfetch]
  );

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  if (loading) {
    return (
      <ThemeProvider theme={globalTheme}>
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
  return (
    <>
      <ThemeProvider theme={globalTheme}>
        <StudyInfoUI
          problem={problem}
          isSm={isSm}
          handleSubmitModal={handleSubmitModal}
          handleViewTime={handleViewTime}
          handleTime={handleTime}
        />
        <Box
          sx={{
            maxWidth: "1165px",
            width: "100%",
            paddingX: "25px",
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
            <Grid container>
              <Grid item xs={12} md={6}>
                {problem ? (
                  <>
                    <ProblemUI
                      problem={problem}
                      chooseAnswer={chooseAnswer}
                      isSm={isSm}
                      handleBookmark={handleBookmark}
                    />
                  </>
                ) : (
                  <div>Loading problem...</div>
                )}
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
                        이론
                      </Typography>
                    }
                    sx={{ flex: 1 }}
                  />
                </Tabs>
                {problem &&
                  (tabValue === 0 ? (
                    <SolutionUI
                      solution={problem.solution}
                      isView={problem.viewSolution}
                      handleView={handleViewSolution}
                      tabValue={tabValue}
                    />
                  ) : (
                    <SolutionUI
                      solution={problem!.theory}
                      isView={problem!.viewTheory}
                      handleView={handleViewTheory}
                      tabValue={tabValue}
                    />
                  ))}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <StudyFooterUI
          nextProblem={nextProblem}
          prevProblem={prevProblem}
          handleOmrModal={handleOmrModal}
          problemNumber={problemNumber}
          problems={problems}
        />
        <Modal open={submitModalopen} onClose={handleSubmitModal}>
          <SubmitResultUI
            sendResult={sendResult}
            handleSubmitModal={handleSubmitModal}
            solvedProblemsNumber={solvedProblemsNumber}
            viewTime={submitTime}
          />
        </Modal>
        <Modal open={omrModalopen} onClose={handleOmrModal}>
          <ProblemNumberList
            handleOmrModal={handleOmrModal}
            setProblemNumber={setProblemNumber}
            problems={problems}
          />
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default StudyMainUI;
