"use client";
import BookMarkFillIcon from "@/public/icons/bookmark-fill.svg";
import BookMarkLineIcon from "@/public/icons/bookmark-line.svg";
import SirenLineIcon from "@/public/icons/siren-line.svg";
import { Box, Container, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import ProblemMarkdown from "../molecule/problemMarkdown";
import ProblemChoiceUI from "../molecule/problemChoiceUI";

const ProblemUI: React.FC<{
  problem: ProblemDetailType;
  setProblem: React.Dispatch<React.SetStateAction<ProblemViewType>>;
  chooseAnswer: (number: number) => void;
  isSm: boolean;
  handleBookmark: (problemId: number) => void;
}> = memo(({ problem, chooseAnswer, isSm, handleBookmark }) => {
  const [colors, setColors] = useState(["white", "white", "white", "white", "white"]);
  const changeColor = () => {
    if (problem.chooseNumber === -1) {
      setColors(["white", "white", "white", "white", "white"]);
      return;
    }
    if (problem.chooseNumber === problem.answerNumber) {
      setColors(prev => {
        const newColors = ["white", "white", "white", "white", "white"];
        newColors[problem.chooseNumber - 1] = "var(--c-light-green)";
        return newColors;
      });
    } else {
      setColors(prev => {
        const newColors = ["white", "white", "white", "white", "white"];
        newColors[problem.chooseNumber - 1] = "var(--c-light-red)";
        newColors[problem.answerNumber - 1] = "var(--c-light-green)";
        return newColors;
      });
    }
  };

  const alerting = () => {
    alert("신고되었습니다.");
  };
  useEffect(() => {
    changeColor();
  }, [problem.chooseNumber]);

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          paddingTop: 2,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Box
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
              marginRight: 1,
            }}
            onClick={() => {
              handleBookmark(problem.problemId);
            }}
          >
            {problem.isBookmark ? (
              <BookMarkFillIcon width={isSm ? 24 : 32} height={isSm ? 24 : 32} />
            ) : (
              <BookMarkLineIcon width={isSm ? 24 : 32} height={isSm ? 24 : 32} />
            )}
          </Box>
          <Box
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={alerting}
          >
            <SirenLineIcon width={isSm ? 24 : 32} height={isSm ? 24 : 32} />
          </Box>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Box
            sx={{
              marginBottom: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Typography
                variant="h3"
                fontSize={{
                  xs: "14px",
                  sm: "18px",
                }}
                color="var(--c-gray3)"
              >
                {problem.examInfo.description} ({problem.subjectInfo.name})
              </Typography>
            </Box>
            <Box
              sx={{
                overflowWrap: "break-word",
                // paddingX: 2,
              }}
            >
              <ProblemMarkdown description={problem.description} />
            </Box>
          </Box>
          {problem.choices.map((choice, idx) => (
            <ProblemChoiceUI
              key={idx}
              choiceNumber={idx}
              chooseAnswer={chooseAnswer}
              color={colors[idx]}
              problem={problem}
            />
          ))}
        </Box>
      </Container>
    </>
  );
});
export default ProblemUI;
