"use client";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { memo, use, useEffect, useState } from "react";
import { Bs1Circle, Bs2Circle, Bs3Circle, Bs4Circle, Bs5Circle } from "react-icons/bs";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import SolutionUI from "./solutionUI";

const ProblemUI: React.FC<{
  props: Problem;
  chooseAnswer: (number: number) => void;
  isSolution: number;
}> = memo(({ props, chooseAnswer, isSolution }) => {
  const problem = props;
  const circles = [Bs1Circle, Bs2Circle, Bs3Circle, Bs4Circle, Bs5Circle];
  const [colors, setColors] = useState(["white", "white", "white", "white", "white"]);
  const changeColor = () => {
    if (problem.chooseNumber === 0) {
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
        <Box sx={{ marginBottom: 2 }}>
          <Box
            sx={{
              fontSize: "16px",
              fontFamily: "Pretendard-Regular",
            }}
          >
            <Typography variant="body1">1번</Typography>
            <Box
              sx={{
                fontSize: { xs: "1.1rem", md: "1rem" },
                overflowWrap: "break-word", // Ensure long words break to fit within the box
              }}
            >
              <Markdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
                components={{
                  p: ({ node, ...content }) => (
                    <Box
                      sx={{
                        width: "100%", // Box의 너비를 100%로 설정
                      }}
                    >
                      {content.children}
                    </Box>
                  ),
                  img: ({ node, ...content }) => (
                    <Box
                      sx={{
                        height: "100%", // Box의 높이를 100%로 설정
                        width: "100%", // Box의 너비를 100%로 설정
                        display: "flex", // Flexbox 레이아웃 사용
                        flexDirection: "column",
                      }}
                    >
                      <img
                        src={content.src}
                        alt={content.alt}
                        style={{ objectFit: "cover", width: "100%", maxWidth: "300px" }}
                      />
                    </Box>
                  ),
                }}
              >
                {problem.description}
              </Markdown>
            </Box>
          </Box>
          <Grid container>
            {problem.choices.map((choice, idx) => (
              <Grid item xs={12} key={idx}>
                <Box
                  onClick={() => {
                    chooseAnswer(idx + 1);
                  }}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: problem.chooseNumber === 0 ? "var(--c-grey)" : "",
                    },
                    backgroundColor: colors[idx],
                  }}
                >
                  <Box
                    mx={2}
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                  >
                    {circles[idx].call(null, { size: 20 })}
                  </Box>
                  <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex, rehypeRaw]}>
                    {choice}
                  </Markdown>
                </Box>
              </Grid>
            ))}
          </Grid>
          {isSolution === 1 ? <SolutionUI solution={problem.solution} /> : <></>}
        </Box>
      </Container>
    </>
  );
});
export default ProblemUI;
