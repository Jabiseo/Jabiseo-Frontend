"use client";
import BookMarkFillIcon from "@/public/icons/bookmark-fill.svg";
import BookMarkLineIcon from "@/public/icons/bookmark-line.svg";
import SirenLineIcon from "@/public/icons/siren-line.svg";
import { Box, Container, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import ProblemChoiceUI from "../../study/components/problemChoiceUI";

const ProblemUI: React.FC<{
  problem: ProblemViewType;
  chooseAnswer: (number: number) => void;
  isMd: boolean;
}> = memo(({ problem, chooseAnswer, isMd }) => {
  const [colors, setColors] = useState(["white", "white", "white", "white", "white"]);
  const changeColor = () => {
    if (problem.chooseNumber === -1) {
      setColors(["white", "white", "white", "white", "white"]);
    } else {
      setColors(() => {
        const newColors = ["white", "white", "white", "white", "white"];
        newColors[problem.chooseNumber - 1] = "var(--c-grey)";
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
              marginRight: 1,
            }}
            onClick={bookmarking}
          >
            {problem.isBookmark ? (
              <BookMarkFillIcon width={isMd ? 24 : 32} height={isMd ? 24 : 32} />
            ) : (
              <BookMarkLineIcon width={isMd ? 24 : 32} height={isMd ? 24 : 32} />
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
            <SirenLineIcon width={isMd ? 24 : 32} height={isMd ? 24 : 32} />
          </Box>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Box>
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
                marginRight={1}
              >
                {problem.problemNumber}.
              </Typography>
              <Typography
                variant="h3"
                fontSize={{
                  xs: "14px",
                  sm: "18px",
                }}
                color="var(--c-gray3)"
              >
                ({problem.examInfo.description})
              </Typography>
            </Box>
            <Box
              sx={{
                overflowWrap: "break-word",
                // paddingX: 2,
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
                      <Typography
                        variant="h3"
                        fontSize={{
                          xs: "14px",
                          sm: "18px",
                        }}
                      >
                        {content.children}
                      </Typography>
                    </Box>
                  ),
                  // span: ({ node, ...content }) =>
                  //   node?.properties.className == "katex-html" ? (
                  //     <></>
                  //   ) : (
                  //     <span>{content.children}</span>
                  //   ),
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
