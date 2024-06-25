"use client";

import { use, useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ProblemItem from "./problemItem";
import { Box, Button, Typography } from "@mui/material";
import ProblemResultDetail from "./problemResultDetail";
import Link from "next/link";

const ProblemList = () => {
  const [problems, setProblems] = useState<ProblemViewType[]>([]);
  const [isDetail, setIsDetail] = useState(false);
  const [problemNumber, setProblemNumber] = useState<number>(1);

  const prevProblem = () => {
    setProblemNumber(problemNumber - 1);
  };
  const nextProblem = () => {
    setProblemNumber(problemNumber + 1);
  };

  const gotoProblem = useCallback((number: number) => {
    localStorage.setItem("scrollPosition", window.scrollY.toString());
    setProblemNumber(number);
    setIsDetail(true);
  }, []);

  const gotoResult = useCallback(() => {
    setIsDetail(false);
  }, []);

  useEffect(() => {
    const problems = localStorage.getItem("problems");
    if (problems) {
      setProblems(JSON.parse(problems));
    }
  }, []);

  useEffect(() => {
    if (!isDetail) {
      const scrollPosition = localStorage.getItem("scrollPosition");
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
      }
    }
  }, [isDetail]);
  return (
    <>
      <Container maxWidth="md">
        {!isDetail ? (
          <>
            <Box mb={2}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                문제 풀이 결과
              </Typography>
              <Typography variant="h3" color="initial">
                총 {problems.filter(problem => problem.chooseNumber !== 0).length}문제 중{" "}
                {problems.filter(problem => problem.chooseNumber === problem.answerNumber).length}
                문제를 맞추셨습니다.
              </Typography>
              <Link href="/">
                <Button variant="contained" color="primary">
                  메인으로 돌아가기
                </Button>
              </Link>
            </Box>
            {problems.map((problem, index) => (
              <ProblemItem
                key={index}
                props={problem}
                problemNumber={index + 1}
                gotoProblem={gotoProblem}
              />
            ))}{" "}
          </>
        ) : (
          <ProblemResultDetail
            props={problems[problemNumber - 1]}
            problemNumber={problemNumber}
            prevProblem={prevProblem}
            nextProblem={nextProblem}
            gotoResult={gotoResult}
          />
        )}
      </Container>
    </>
  );
};

export default ProblemList;
