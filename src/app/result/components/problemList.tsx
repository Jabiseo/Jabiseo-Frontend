"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import ProblemItem from "./problemItem";
import ResultInfoUI from "./resultInfoUI";

const ProblemList = ({
  problems,
  setProblems,
  learningTime,
}: {
  problems: ProblemViewType[];
  setProblems: React.Dispatch<React.SetStateAction<ProblemViewType[]>>;
  learningTime: string;
}) => {
  const solvedProblem = `${
    problems.filter(problem => problem.chooseNumber === problem.answerNumber).length
  } / ${problems.filter(problem => problem.chooseNumber !== 0).length}`;
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <ResultInfoUI solvedProblem={solvedProblem} isSm={isSm} learningTime={learningTime} />
      <Box
        sx={{
          maxWidth: "1165px",
          width: "100%",
          paddingX: "25px",
          boxSizing: "border-box",
          marginBottom: "110px",
        }}
      >
        {problems.map((problem, index) => (
          <ProblemItem
            props={problem}
            isSm={isSm}
            key={problem.problemId}
            setProblems={setProblems}
          />
        ))}
      </Box>
    </>
  );
};

export default ProblemList;
