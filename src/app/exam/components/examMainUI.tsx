"use client";

import { globalTheme } from "@/src/components/globalStyle";
import useProblems from "@/src/hooks/useProblems";
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
import { useCallback, useEffect, useRef, useState } from "react";
import Omr from "../components/omrUI";
import ProblemUI from "../components/problemUI";
import SmallOmrUI from "../components/smallOmrUI";
import ExamFooterUI from "./examFooterUI";
import ExamInfoUI from "./examInfoUI";
import SubmitResultUI from "./SubmitResultUI";

interface ExamMainUIProps {
  getProblems: ProblemViewType[];
}

const ExamMainUI: React.FC<ExamMainUIProps> = ({ getProblems }) => {
  // const { getProblems, loading, error } = useProblems();
  const [problem, setProblem] = useState<ProblemViewType | null>(null);
  const [problems, setProblems] = useState<ProblemViewType[]>([]);
  const [problemNumber, setProblemNumber] = useState<number>(1);
  const [submitModalopen, setSubmitModalOpen] = useState(false);
  const [omrModalopen, setOmrModalOpen] = useState(false);
  const [viewTime, setViewTime] = useState<string>("");
  const [solvedProblemsNumber, setSolvedProblemsNumber] = useState<string>("");
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
  };

  const handleOmrModal = () => {
    setOmrModalOpen(!omrModalopen);
  };

  const handleViewTime = (viewTime: string) => {
    setViewTime(viewTime);
  };

  const studyBoxRef = useRef<HTMLDivElement | null>(null);
  const [studyBoxWidth, setStudyBoxWidth] = useState(0);

  useEffect(() => {
    if (studyBoxRef.current) {
      setStudyBoxWidth(studyBoxRef.current.offsetWidth);
    }
  }, [problems]);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down(960));

  // if (loading) {
  //   return (
  //     <ThemeProvider theme={globalTheme}>
  //       <Container>
  //         <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
  //           <CircularProgress />
  //         </Box>
  //       </Container>
  //     </ThemeProvider>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Container>
  //       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
  //         <Typography>Error</Typography>
  //       </Box>
  //     </Container>
  //   );
  // }
  return (
    <>
      <ThemeProvider theme={globalTheme}>
        <ExamInfoUI
          problem={problem}
          isMd={isMd}
          handleSubmitModal={handleSubmitModal}
          handleViewTime={handleViewTime}
        />
        <Box
          sx={{
            minHeight: {
              xs: "100vh",
              md: "100vh",
            },
            maxWidth: "1140px",
            width: "100%",
            paddingX: {
              xs: "25px",
              md: "0px",
            },
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              margin: "0 auto",
              maxWidth: "1140px",
              minWidth: "320px",
              height: "100%",
            }}
          >
            <Grid container>
              <Grid item sm={0} md={2}></Grid>
              <Grid item sm={12} md={8}>
                {problem ? (
                  <>
                    <ProblemUI problem={problem} chooseAnswer={chooseAnswer} isMd={isMd} />
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
                {!isMd && (
                  <Omr
                    problems={problems}
                    setProblemNumber={setProblemNumber}
                    chooseAnswer={chooseAnswer}
                  />
                )}
              </Grid>
            </Grid>
          </Box>

          <ExamFooterUI
            handleOmrModal={handleOmrModal}
            problemNumber={problemNumber}
            problems={problems}
            prevProblem={prevProblem}
            nextProblem={nextProblem}
            isMd={isMd}
          />
        </Box>
        <Modal open={submitModalopen} onClose={handleSubmitModal}>
          <SubmitResultUI
            sendResult={sendResult}
            handleSubmitModal={handleSubmitModal}
            solvedProblemsNumber={solvedProblemsNumber}
            viewTime={viewTime}
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
