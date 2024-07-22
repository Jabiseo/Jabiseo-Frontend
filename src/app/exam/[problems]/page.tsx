"use client";

import Appbar from "@/src/components/Appbar";
import { globalTheme } from "@/src/components/globalStyle";
import useProblems from "@/src/hooks/useProblems";
import {
  Box,
  Button,
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
import { useEffect, useRef, useState } from "react";
import ExamHeader from "../components/examHeader";
import Omr from "../components/omrUI";
import ProblemUI from "../components/problemUI";
import SmallOmrUI from "../components/smallOmrUI";
import StudyTime from "../components/studyTime";

const ExamPage = () => {
  const { getProblems, loading, error } = useProblems();
  const [problem, setProblem] = useState<ProblemViewType | null>(null);
  const [problems, setProblems] = useState<ProblemViewType[]>([]);
  const [problemNumber, setProblemNumber] = useState<number>(1);
  const [submitModalopen, setSubmitModalOpen] = useState(false);
  const [omrModalopen, setOmrModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!getProblems) return;
    setProblems(getProblems);
    setProblem(getProblems[problemNumber - 1]);
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

  const chooseAnswer = (number: number, chooseProblemNumber = problemNumber) => {
    setProblem(prev => {
      if (!prev) return null;
      return { ...prev, chooseNumber: number };
    });
    problems[chooseProblemNumber - 1].chooseNumber = number;
  };

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

  const studyBoxRef = useRef<HTMLDivElement | null>(null);
  const [studyBoxWidth, setStudyBoxWidth] = useState(0);

  useEffect(() => {
    if (studyBoxRef.current) {
      setStudyBoxWidth(studyBoxRef.current.offsetWidth);
    }
  }, [loading]);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

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
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            minHeight: {
              xs: "130vh",
              md: "110vh",
              backgroundColor: "white",
            },
          }}
        >
          <Appbar />
          <Box
            height={{
              xs: "56px",
              sm: "64px",
            }}
          ></Box>
          <ExamHeader />
          <Box
            sx={{
              width: "100%",
              height: "70px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              borderBottom: "1px solid var(--c-gray2)",
              px: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: "1140px",
                width: `${studyBoxWidth}px`,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {isSm ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontSize={{
                        xs: "14px",
                        sm: "20px",
                      }}
                    >
                      {problem?.subject.name}
                    </Typography>
                    <StudyTime />
                  </Box>

                  <Button
                    onClick={handleSubmitModal}
                    sx={{
                      marginLeft: 2,
                      backgroundColor: "white",
                      border: "1px solid var(--c-gray2)",
                      borderRadius: "40px",
                      padding: "10px 28px",
                    }}
                  >
                    <Typography
                      variant="h1"
                      fontSize={{
                        xs: "14px",
                        sm: "18px",
                      }}
                      color="var(--c-sub4)"
                    >
                      제출하기
                    </Typography>
                  </Button>
                </>
              ) : (
                <>
                  <Typography
                    variant="h4"
                    fontSize={{
                      xs: "14px",
                      sm: "20px",
                    }}
                  >
                    {problem?.subject.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <StudyTime />
                    <Button
                      onClick={handleSubmitModal}
                      sx={{
                        marginLeft: 2,
                        backgroundColor: "white",
                        border: "1px solid var(--c-gray2)",
                        borderRadius: "40px",
                        padding: "10px 28px",
                      }}
                    >
                      <Typography
                        variant="h1"
                        fontSize={{
                          xs: "14px",
                          sm: "18px",
                        }}
                        color="var(--c-sub4)"
                      >
                        제출하기
                      </Typography>
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              margin: "0 auto",
              maxWidth: "1140px",
              minWidth: "320px",
            }}
            ref={studyBoxRef}
          >
            <Grid container>
              <Grid item sm={0} md={2}></Grid>
              <Grid item sm={12} md={8}>
                {problem ? (
                  <>
                    <ProblemUI props={problem} chooseAnswer={chooseAnswer} />
                  </>
                ) : (
                  <div>Loading problem...</div>
                )}
              </Grid>
              <Grid
                item
                sm={0}
                md={2}
                maxHeight="70vh"
                sx={{
                  overflowY: "auto",
                }}
              >
                {!isMd && (
                  <Omr
                    problems={problems}
                    handleOmrModal={handleOmrModal}
                    setProblemNumber={setProblemNumber}
                    chooseAnswer={chooseAnswer}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
          <Box height={"108px"}></Box>
          <Box
            sx={{
              position: "fixed",
              width: "100%",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "26px",
              borderTop: "1px solid #ddd",
              backgroundColor: "var(--c-grey)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                maxWidth: "1140px",
                width: `${studyBoxWidth}px`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Button
                sx={{
                  borderRadius: "40px",
                  backgroundColor: "var(--c-main)",
                  padding: {
                    xs: "5px 14px",
                    sm: "10px 28px",
                  },
                  "&:hover": {
                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                    backgroundColor: "var(--c-main)",
                  },
                }}
                onClick={handleOmrModal}
              >
                <Typography
                  variant="subtitle1"
                  fontSize={{
                    xs: "14px",
                    sm: "18px",
                  }}
                  color={"white"}
                >
                  OMR 보기
                </Typography>
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "16px",
                }}
              >
                <Button
                  sx={{
                    visibility: problemNumber === 1 ? "hidden" : "visible",
                    borderRadius: "40px",
                    border: "1.5px solid var(--c-gray2)",
                    padding: {
                      xs: "5px 14px",
                      sm: "10px 28px",
                    },
                  }}
                  onClick={prevProblem}
                >
                  <Typography
                    variant="subtitle1"
                    fontSize={{
                      xs: "14px",
                      sm: "18px",
                    }}
                  >
                    이전
                  </Typography>
                </Button>
                <Box
                  minWidth="70px"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontSize={{
                      xs: "14px",
                      sm: "18px",
                    }}
                  >
                    {problemNumber}/{problems?.length}
                  </Typography>
                </Box>
                <Button
                  sx={{
                    visibility: problemNumber === problems.length ? "hidden" : "visible",
                    borderRadius: "40px",
                    border: "1.5px solid var(--c-gray2)",
                    padding: {
                      xs: "5px 14px",
                      sm: "10px 28px",
                    },
                  }}
                  onClick={nextProblem}
                >
                  <Typography
                    variant="subtitle1"
                    fontSize={{
                      xs: "14px",
                      sm: "18px",
                    }}
                  >
                    다음
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
        <Modal open={submitModalopen} onClose={handleSubmitModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: {
                xs: "90%",
                sm: "80%",
                md: "60%",
              },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
              fontSize: {
                xs: "1rem",
                md: "10rem",
              },
            }}
          >
            <Typography variant="h6" component="h2">
              결과를 제출하시겠습니까?
            </Typography>
            <Typography variant="h6" component="h2">
              결과를 제출하면 다시 돌아올 수 없습니다
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={handleSubmitModal} sx={{ mr: 1 }}>
                취소
              </Button>
              <Button variant="contained" color="primary" onClick={sendResult}>
                확인
              </Button>
            </Box>
          </Box>
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

export default ExamPage;
