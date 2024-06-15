"use client";

import ProblemUI from "./components/problemUI";
import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import Appbar from "@/src/components/Appbar";
import { getProblems } from "@/src/api/types/apis/problem";

const StudyPage = () => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [problemNumber, setProblemNumber] = useState<number>(1);
  const [time, setTime] = useState(0);
  const [viewTime, setViewTime] = useState("00분 00초");
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(prev => prev ^ 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const secondsToMMSS = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}분 ${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }초`;
  };

  useEffect(() => {
    setViewTime(secondsToMMSS(time));
  }, [time]);

  useEffect(() => {
    const fetchProblems = async () => {
      const fetchedProblems = await getProblems();
      setProblems(fetchedProblems);
      setProblem(fetchedProblems[0]);
    };

    fetchProblems();
  }, []);

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
                        {problem.examInfo.year}년도 {problem.examInfo.round}회
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button variant="contained" color="primary">
                        제출하기
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography variant="body1" mx={3}>
                      {viewTime}
                    </Typography>
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
    </>
  );
};

export default StudyPage;
