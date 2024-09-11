import { Box, Button, Typography } from "@mui/material";
import SimilarProblemItem from "../molecule/similarProblemItem";
import Link from "next/link";

interface SimilarProblemListProps {
  similarProblems?: SimilarProblem[];
  goToSimilarProblem: (problemId: number) => void;
}

const dummySimilarProblem: SimilarProblem[] = [
  {
    problemId: 1,
    examInfo: {
      examId: 1,
      description: "유사 문제를 보기 위해서는",
    },
    subjectInfo: {
      subjectId: 1,
      sequence: 1,
      name: "",
    },
    isBookmark: false,
    description: "유사 문제를 보기 위해서는 로그인을 해주세요.",
  },
  {
    problemId: 2,
    examInfo: {
      examId: 1,
      description: "유사 문제를 보기 위해서는",
    },
    subjectInfo: {
      subjectId: 1,
      sequence: 1,
      name: "",
    },
    isBookmark: false,
    description: "유사 문제를 보기 위해서는 로그인을 해주세요.",
  },
  {
    problemId: 3,
    examInfo: {
      examId: 1,
      description: "유사 문제를 보기 위해서는",
    },
    subjectInfo: {
      subjectId: 1,
      sequence: 1,
      name: "",
    },
    isBookmark: false,
    description: "유사 문제를 보기 위해서는 로그인을 해주세요.",
  },
];

const SimilarProblemList = ({ similarProblems, goToSimilarProblem }: SimilarProblemListProps) => {
  const dummy = dummySimilarProblem;
  if (!similarProblems)
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          minHeight: "400px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "calc(100% - 28px)",
            height: "calc(100% - 24px)",
            backgroundColor: "#ffffff70",
            filter: "blur(8px)",
            margin: {
              xs: "12px 14px",
              sm: "16px 23px",
            },
            boxSizing: "border-box",
          }}
        >
          {dummy.map(similarProblem => (
            <SimilarProblemItem
              key={similarProblem.problemId}
              similarProblem={similarProblem}
              goToSimilarProblem={() => {}}
            />
          ))}
        </Box>
        <Button
          disableTouchRipple
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "var(--c-main)",
            borderRadius: "40px",
            padding: {
              xs: "8px 16px",
              sm: "12px 32px",
            },
            "&:hover": {
              backgroundColor: "var(--c-main)",
            },
          }}
        >
          <Link href="/login" style={{ textDecoration: "none" }}>
            <Typography
              color="white"
              fontSize={{
                xs: "12px",
                sm: "18px",
              }}
              variant="h1"
            >
              로그인을 해주세요
            </Typography>
          </Link>
        </Button>
      </Box>
    );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: {
          xs: "12px 14px",
          sm: "16px 23px",
        },
        boxSizing: "border-box",
        minHeight: "400px",
      }}
    >
      {similarProblems.map(similarProblem => (
        <SimilarProblemItem
          key={similarProblem.problemId}
          similarProblem={similarProblem}
          goToSimilarProblem={goToSimilarProblem}
        />
      ))}
    </Box>
  );
};

export default SimilarProblemList;
