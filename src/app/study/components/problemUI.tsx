"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { Bs1Circle, Bs2Circle, Bs3Circle, Bs4Circle, Bs5Circle } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { PiSirenFill } from "react-icons/pi";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import SolutionUI from "./solutionUI";

const ProblemUI: React.FC<{
  props: ProblemWithChooseNumber;
  chooseAnswer: (number: number) => void;
}> = memo(({ props, chooseAnswer }) => {
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
  /**
   * @todo 북마크 기능
   */
  const bookmarking = () => {
    problem.isBookmark = !problem.isBookmark;
  };
  /**
   * @todo 신고하기 기능
   */
  const alerting = () => {
    alert("신고하기 기능은 준비중입니다.");
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
              marginRight: 2,
            }}
            onClick={bookmarking}
          >
            {problem.isBookmark ? <FaRegBookmark size={25} /> : <FaBookmark size={25} />}
          </Box>
          <Box
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={alerting}
          >
            <PiSirenFill size={30} />
          </Box>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" fontSize="18px" marginRight={1}>
                1.
              </Typography>
              <Typography variant="subtitle1" fontSize="18px" color="var(--c-gray3)">
                ({problem.examInfo.description})
              </Typography>
            </Box>
            <Box
              sx={{
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
                      <Typography variant="subtitle1" fontSize="18px">
                        {content.children}
                      </Typography>
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
          <Grid container marginTop={2}>
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
                    fontSize: "1rem",
                    paddingY: 2,
                  }}
                >
                  <Box
                    mx={2}
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                  >
                    {circles[idx].call(null, { size: 20 })}
                  </Box>
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
                          <Typography variant="body2" fontSize="18px">
                            {content.children}
                          </Typography>
                        </Box>
                      ),
                    }}
                  >
                    {choice}
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
export default ProblemUI;
