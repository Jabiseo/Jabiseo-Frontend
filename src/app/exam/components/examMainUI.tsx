"use client";

import { mainfetch } from "@/src/api/apis/mainFetch";
import { globalTheme } from "@/src/components/globalStyle";
import {
  Box,
  CircularProgress,
  Container,
  Drawer,
  Grid,
  Modal,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Omr from "../components/omrUI";
import ProblemUI from "../components/problemUI";
import SmallOmrUI from "../components/smallOmrUI";
import ExamFooterUI from "./examFooterUI";
import ExamInfoUI from "./examInfoUI";
import SubmitResultUI from "./SubmitResultUI";
import handleBookmarkModule from "@/src/api/apis/handleBookmark";

interface ExamMainUIProps {
  getProblems: ProblemViewType[];
  loading: boolean;
  error: string | null;
  certificateInfo: CertificateType;
}
const ExamMainUI: React.FC<ExamMainUIProps> = ({
  getProblems,
  loading,
  error,
  certificateInfo,
}) => {
  const [problem, setProblem] = useState<ProblemViewType | null>(null);
  const [problems, setProblems] = useState<ProblemViewType[]>([]);
  const [problemNumber, setProblemNumber] = useState<number>(1);
  const [submitModalopen, setSubmitModalOpen] = useState(false);
  const [omrModalopen, setOmrModalOpen] = useState(false);
  const [viewTime, setViewTime] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  // 제출하기 UI상 보일 시간
  const [submitTime, setSubmitTime] = useState<string>("");
  // 결과 제출 시 실제 제출 시간
  const [submitNumberTime, setSubmitNumberTime] = useState<number>();
  const [solvedProblemsNumber, setSolvedProblemsNumber] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!getProblems) return;
    setProblems(getProblems);
    setProblem(getProblems[problemNumber - 1]);
    setSolvedProblemsNumber("0/" + getProblems.length);
  }, [getProblems]);

  useEffect(() => {
    if (problem && problem.problemId == problems[problemNumber - 1].problemId) return;
    setProblem(problems[problemNumber - 1]);
  }, [problemNumber, problems]);

  useEffect(() => {
    if (!problem) return;
    setProblem(problems[problemNumber - 1]);
  }, [problems]);

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
    (number: number, chooseProblemNumber: number = problemNumber) => {
      setProblem(prev => {
        if (!prev) return null;
        return { ...prev, chooseNumber: number };
      });
      const newProblems = problems;
      newProblems[chooseProblemNumber - 1].chooseNumber = number;
      let solveProblem = 0;
      newProblems.forEach(problem => {
        if (problem.chooseNumber != -1) {
          solveProblem++;
        }
      });
      setSolvedProblemsNumber(solveProblem + "/" + problems.length);
      setProblems(newProblems);
    },
    [problems, problem]
  );

  const sendResult = async () => {
    const submitResult: SubmitResultType = {
      learningTime: submitNumberTime!,
      certificateId: certificateInfo.certificateId,
      learningMode: "EXAM",
      problems: problems
        .filter(problem => problem.chooseNumber !== -1)
        .map(problem => {
          return {
            problemId: problem.problemId,
            choice: problem.chooseNumber,
          };
        }),
    };
    if (localStorage.getItem("accessToken") === null) return;
    await mainfetch(
      "/learning",
      {
        method: "POST",
        body: submitResult,
      },
      true
    );

    localStorage.setItem("problems", JSON.stringify({ problems: [...problems], certificateInfo }));
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

  const handleBookmark = useCallback(
    (problem: ProblemViewType) => {
      handleBookmarkModule<ProblemViewType>(problem, isProcessing, setIsProcessing, setProblems);
    },
    [isProcessing, setIsProcessing, setProblems]
  );

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down(960));
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

  if (error) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography>Error</Typography>
        </Box>
      </Container>
    );
  }
  return (
    <>
      <ThemeProvider theme={globalTheme}>
        <ExamInfoUI
          problem={problem}
          isSm={isSm}
          handleSubmitModal={handleSubmitModal}
          handleViewTime={handleViewTime}
          handleTime={handleTime}
        />
        <Box
          sx={{
            minHeight: {
              xs: "100vh",
              md: "100vh",
            },
            maxWidth: "1165px",
            width: "100%",
            paddingX: "25px",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              margin: "0 auto",
              maxWidth: "1165px",
              minWidth: "320px",
              height: "100%",
            }}
          >
            {!isMd ? (
              <Grid container>
                <Grid item sm={0} md={2}></Grid>
                <Grid item sm={12} md={8}>
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
                <Grid
                  item
                  sm={0}
                  md={2}
                  maxHeight="86vh"
                  sx={{
                    overflowY: "auto",
                    scrollbarWidth: "none",
                  }}
                >
                  {!isSm && (
                    <Omr
                      problems={problems}
                      setProblemNumber={setProblemNumber}
                      chooseAnswer={chooseAnswer}
                    />
                  )}
                </Grid>
              </Grid>
            ) : problem ? (
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
          </Box>

          <ExamFooterUI
            handleOmrModal={handleOmrModal}
            problemNumber={problemNumber}
            problems={problems}
            prevProblem={prevProblem}
            nextProblem={nextProblem}
            isSm={isSm}
          />
        </Box>
        <Modal open={submitModalopen} onClose={handleSubmitModal}>
          <SubmitResultUI
            sendResult={sendResult}
            handleSubmitModal={handleSubmitModal}
            solvedProblemsNumber={solvedProblemsNumber}
            viewTime={submitTime}
          />
        </Modal>
        <Drawer open={omrModalopen} onClose={handleOmrModal} anchor="bottom">
          <Box
            sx={{
              height: "50vh",
            }}
          >
            <SmallOmrUI
              problems={problems}
              handleOmrModal={handleOmrModal}
              setProblemNumber={setProblemNumber}
              chooseAnswer={chooseAnswer}
            />
          </Box>
        </Drawer>
      </ThemeProvider>
    </>
  );
};

export default ExamMainUI;
