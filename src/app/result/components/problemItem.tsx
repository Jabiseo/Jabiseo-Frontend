"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { Bs1Circle, Bs2Circle, Bs3Circle, Bs4Circle, Bs5Circle } from "react-icons/bs";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";

const ProblemItem: React.FC<{
  props: ProblemViewType;
  problemNumber: number;
  gotoProblem: (number: number) => void;
}> = memo(({ props, problemNumber, gotoProblem }) => {
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
  }, []);

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          paddingTop: 2,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          border:
            problem.chooseNumber === 0
              ? "1px solid #ccc"
              : problem.chooseNumber === problem.answerNumber
              ? "1px solid var(--c-light-green)"
              : "1px solid var(--c-light-red)",
          borderRadius: 2,
          mb: 2,
          "&:hover": {
            cursor: "pointer",
            border: "2px solid black",
          },
        }}
        onClick={() => gotoProblem(problemNumber)}
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
                overflowWrap: "break-word",
              }}
            >
              <Markdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
                components={{
                  p: ({ node, ...content }) => (
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      {content.children}
                    </Box>
                  ),
                  img: ({ node, ...content }) => (
                    <Box
                      sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
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
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderRadius: 2,
                    backgroundColor: colors[idx],
                    fontSize: { xs: "1rem", md: "1rem" },
                  }}
                >
                  <Box
                    mx={2}
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                  >
                    {circles[idx].call(null, { size: 20 })}
                  </Box>
                  <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex, rehypeRaw]}>
                    {choice.choice}
                  </Markdown>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
});
export default ProblemItem;
