"use client";

import ProblemUI from "../components/problemUI";
import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Modal, Tab, Tabs, Typography } from "@mui/material";
import Appbar from "@/src/components/Appbar";
import { useRouter } from "next/navigation";
import StudyTime from "../components/studyTime";
import useProblems from "@/src/hooks/useProblems";

const StudyPage = () => {
  const { Problems, loading, error } = useProblems();
  const [problem, setProblem] = useState<ProblemWithChooseNumber | null>(null);
  const [problems, setProblems] = useState<ProblemWithChooseNumber[]>([]);
  const [problemNumber, setProblemNumber] = useState<number>(1);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(prev => prev ^ 1);
  };

  useEffect(() => {
    setProblem(problems[problemNumber - 1]);
    setTabValue(0);
  }, [problemNumber]);

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

  const handleModal = () => {
    setOpen(!open);
  };
  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: {
            xs: "130vh",
            md: "110vh",
          },
        }}
      >
        <Appbar />
        <Box
          sx={{
            margin: "0 auto",
            maxWidth: "1440px",
            minWidth: "320px",
            paddingX: { xs: "20px", sm: "40px", md: "60px" },
            marginTop: {
              xs: "64px",
              md: "90px",
            },
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={0} md={2}>
              <Box
                sx={{
                  height: { xs: "0", md: "100vh" },
                  display: { xs: "none", md: "block" },
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} md={8}>
              {problem ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #ccc",
                      paddingBottom: 1,
                      marginBottom: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "0.9rem",
                            md: "1rem",
                          },
                        }}
                      >
                        {problem.subject.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        sx={{
                          fontSize: {
                            xs: "0.9rem",
                            md: "1rem",
                          },
                        }}
                      >
                        {problem.examInfo.description} 시험
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button variant="contained" color="primary" onClick={handleModal}>
                        제출하기
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <StudyTime />
                  </Box>
                  <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    centered
                    variant="fullWidth"
                    sx={{ mt: 2 }}
                  >
                    <Tab label="문제" sx={{ flex: 1 }} />
                    <Tab label="해설" sx={{ flex: 1 }} />
                  </Tabs>
                  <ProblemUI props={problem} chooseAnswer={chooseAnswer} isSolution={tabValue} />
                </>
              ) : (
                <div>Loading problem...</div>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "16px",
                  borderTop: "1px solid #ddd",
                  backgroundColor: "var(--c-grey)",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    visibility: problemNumber === 1 ? "hidden" : "visible",
                  }}
                  onClick={prevProblem}
                >
                  이전
                </Button>
                <Typography>{problemNumber}/100</Typography>
                <Button
                  variant="outlined"
                  sx={{
                    visibility: problemNumber === 100 ? "hidden" : "visible",
                  }}
                  onClick={nextProblem}
                >
                  다음
                </Button>
              </Box>
            </Grid>
            <Grid item xs={0} md={2}>
              <Box
                sx={{
                  height: { xs: "0", md: "100vh" },
                  display: { xs: "none", md: "block" },
                }}
              ></Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Modal open={open} onClose={handleModal}>
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
            <Button onClick={handleModal} sx={{ mr: 1 }}>
              취소
            </Button>
            <Button variant="contained" color="primary" onClick={sendResult}>
              확인
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default StudyPage;
