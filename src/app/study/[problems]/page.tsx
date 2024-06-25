"use client";

import ProblemUI from "../components/problemUI";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
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
import Appbar from "@/src/components/Appbar";
import { useRouter } from "next/navigation";
import StudyTime from "../components/studyTime";
import useProblems from "@/src/hooks/useProblems";
import { getProblems } from "@/src/api/types/apis/problem";
import { globalTheme } from "@/src/components/globalStyle";
import StudyHeader from "../components/studyHeader";
import SolutionUI from "../components/solutionUI";
import { useTheme } from "@mui/material/styles";
import { IoMdClose } from "react-icons/io";

const StudyPage = () => {
  const { Problems, loading, error } = useProblems();
  const [problem, setProblem] = useState<ProblemViewType | null>(null);
  const [problems, setProblems] = useState<ProblemViewType[]>([]);
  const [problemNumber, setProblemNumber] = useState<number>(1);
  const [tabValue, setTabValue] = useState(0);
  const [submitModalopen, setSubmitModalOpen] = useState(false);
  const [omrModalopen, setOmrModalOpen] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(prev => prev ^ 1);
  };
  useEffect(() => {
    const problems = getProblems();
    setProblems(problems);
    setProblem(problems[problemNumber - 1]);
  }, []);

  useEffect(() => {
    if (problem && problem.problemId == problems[problemNumber - 1].problemId) return;
    setProblem(problems[problemNumber - 1]);
    setTabValue(0);
  }, [problemNumber, problems]);

  const nextProblem = () => {
    setProblemNumber(problemNumber + 1);
  };

  const prevProblem = () => {
    setProblemNumber(problemNumber - 1);
  };

  const chooseAnswer = (number: number) => {
    setProblem(prev => {
      if (!prev) return null;
      return { ...prev, chooseNumber: number };
    });
    problems[problemNumber - 1].chooseNumber = number;
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

  const studyBoxRef = useRef<HTMLDivElement | null>(null);
  const [studyBoxWidth, setStudyBoxWidth] = useState(0);

  useEffect(() => {
    if (studyBoxRef.current) {
      setStudyBoxWidth(studyBoxRef.current.offsetWidth);
    }
  }, [loading]);

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
          <StudyHeader />
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
              <Grid item xs={12} md={6}>
                {problem ? (
                  <>
                    <ProblemUI props={problem} chooseAnswer={chooseAnswer} />
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
                {tabValue === 0 ? (
                  <SolutionUI
                    solution={problem!.solution}
                    isView={problem!.viewSolution}
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
                )}
              </Grid>
            </Grid>
          </Box>
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
                  문제 목록
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
                <Typography
                  variant="subtitle1"
                  fontSize={{
                    xs: "14px",
                    sm: "18px",
                  }}
                >
                  {problemNumber}/{problems?.length}
                </Typography>
                <Button
                  sx={{
                    visibility: problemNumber === 100 ? "hidden" : "visible",
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
        <Modal open={omrModalopen} onClose={handleOmrModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "835px",
              width: {
                xs: "90%",
                sm: "70%",
              },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "20px",
            }}
          >
            <IoMdClose onClick={handleOmrModal} size={24} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 2,
              }}
            >
              <Typography
                variant="h1"
                fontSize={{
                  xs: "14px",
                  sm: "20px",
                }}
                mb={4}
              >
                번호를 누르시면 해당 문제로 이동합니다.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                {problems.map((problem, index) => (
                  <Button
                    key={problem.problemId}
                    onClick={() => {
                      setProblemNumber(index + 1);
                      handleOmrModal();
                    }}
                    sx={{
                      backgroundColor:
                        problem.chooseNumber === 0
                          ? "white"
                          : problem.chooseNumber === problem.answerNumber
                          ? "var(--c-light-green)"
                          : "var(--c-light-red)",
                      border: "1.5px solid var(--c-gray5)",
                      borderRadius: "40px",
                      "&:hover": {
                        backgroundColor: "var(--c-gray2)",
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      fontSize={{
                        xs: "14px",
                        sm: "16px",
                      }}
                    >
                      {index + 1 < 10 ? `00${index + 1}` : index + 1 < 99 ? `0${index + 1}` : "100"}
                    </Typography>
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default StudyPage;
