"use client";
import { Box, Button, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { Bs1Circle, Bs2Circle, Bs3Circle, Bs4Circle, Bs5Circle } from "react-icons/bs";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import SolutionUI from "../../study/components/solutionUI";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { PiSirenFill } from "react-icons/pi";

const ProblemResultDetail: React.FC<{
  props: ProblemWithChooseNumber;
  problemNumber: number;
  nextProblem: () => void;
  prevProblem: () => void;
  gotoResult: () => void;
}> = memo(({ props, problemNumber, nextProblem, prevProblem, gotoResult }) => {
  const problem = props;
  const circles = [Bs1Circle, Bs2Circle, Bs3Circle, Bs4Circle, Bs5Circle];
  const [colors, setColors] = useState(["white", "white", "white", "white", "white"]);
  const [tabValue, setTabValue] = useState(0);
  const handleChange = () => {
    setTabValue(prev => prev ^ 1);
  };

  const changeColor = () => {
    if (problem.chooseNumber === 0) {
      setColors(prev => {
        const newColors = ["white", "white", "white", "white", "white"];
        newColors[problem.answerNumber - 1] = "var(--c-light-green)";
        return newColors;
      });
    } else if (problem.chooseNumber === problem.answerNumber) {
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
  }, [problemNumber]);

  return (
    <Container sx={{ minHeight: "120vh" }}>
      <Button onClick={gotoResult}>결과창으로 돌아가기</Button>
      <Tabs value={tabValue} onChange={handleChange} centered variant="fullWidth" sx={{ mt: 2 }}>
        <Tab label="문제" sx={{ flex: 1 }} />
        <Tab label="해설" sx={{ flex: 1 }} />
      </Tabs>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          pt: 2,
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
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
                    {choice}
                  </Markdown>
                </Box>
              </Grid>
            ))}
          </Grid>
          {tabValue === 1 ? <SolutionUI solution={problem.solution} /> : <></>}
        </Box>
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
      </Container>
    </Container>
  );
});
export default ProblemResultDetail;
