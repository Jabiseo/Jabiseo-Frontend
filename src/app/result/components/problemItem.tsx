"use client";
import BookMarkFillIcon from "@/public/icons/bookmark-fill.svg";
import BookMarkLineIcon from "@/public/icons/bookmark-line.svg";
import NoteCloseIcon from "@/public/icons/note-close.svg";
import NoteOpenIcon from "@/public/icons/note-open.svg";
import SirenLineIcon from "@/public/icons/siren-line.svg";
import { Box, Collapse, Container, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import ProblemChoiceUI from "./problemChoiceUI";
import handleBookmarkModule from "@/src/api/apis/handleBookmark";

const ProblemItem: React.FC<{
  props: ProblemViewType;
  isSm: boolean;
  setProblems: React.Dispatch<React.SetStateAction<ProblemViewType[]>>;
}> = memo(({ props, isSm, setProblems }) => {
  const problem = props;
  const [viewSolution, setViewSolution] = useState(false);
  const [colors, setColors] = useState(["white", "white", "white", "white", "white"]);
  const [isProcessing, setIsProcessing] = useState(false);
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
  const handleBookmark = useCallback(
    (problem: BookMarkProblem) => {
      handleBookmarkModule<ProblemViewType>(problem, isProcessing, setIsProcessing, setProblems);
    },
    [isProcessing, setIsProcessing, setProblems]
  );
  useEffect(() => {
    changeColor();
  }, []);
  const handleViewSolution = () => {
    setViewSolution(!viewSolution);
  };
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          minHeight: "430px",
          padding: "32px 24px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          border:
            problem.chooseNumber === 0
              ? "1px solid #ccc"
              : problem.chooseNumber === problem.answerNumber
              ? "1px solid var(--c-green)"
              : "1px solid var(--c-red)",
          borderRadius: "12px",
          mb: "20px",
          "&:hover": {
            cursor: "pointer",
            border: "1px solid black",
          },
        }}
      >
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <Box
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
                marginRight: 1,
              }}
              onClick={handleViewSolution}
            >
              {viewSolution ? (
                <NoteOpenIcon width={isSm ? 24 : 32} height={isSm ? 24 : 32} />
              ) : (
                <NoteCloseIcon width={isSm ? 24 : 32} height={isSm ? 24 : 32} />
              )}
            </Box>
            <Box
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
                marginRight: 1,
              }}
              onClick={() => handleBookmark(problem)}
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
              onClick={() => {
                alert("신고 기능 업데이트 예정입니다.");
              }}
            >
              <SirenLineIcon width={isSm ? 24 : 32} height={isSm ? 24 : 32} />
            </Box>
          </Box>
          <Typography
            variant="subtitle1"
            fontSize={{
              xs: "12px",
              sm: "18px",
            }}
          >
            {problem.problemNumber}. &nbsp;
            <Typography
              variant="subtitle1"
              component="span"
              color="var(--c-gray4)"
              fontSize={{
                xs: "12px",
                sm: "18px",
              }}
            >
              ({problem.examInfo.description})
            </Typography>
          </Typography>
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
                      overflowWrap: "break-word",
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontSize={{
                        xs: "12px",
                        sm: "18px",
                      }}
                    >
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "16px",
          }}
        >
          {problem.choices.map((choice, idx) => (
            <Box
              sx={{
                flexBasis: "100%",
              }}
            >
              <ProblemChoiceUI key={idx} choiceNumber={idx} problem={problem} color={colors[idx]} />
            </Box>
          ))}
        </Box>
        <Collapse in={viewSolution}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "16px",
              backgroundColor: "var(--c-gray1)",
              padding: "20px",
              boxSizing: "border-box",
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "12px", sm: "18px" },
                marginBottom: "10px",
              }}
            >
              해설
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                fontSize: { xs: "12px", sm: "18px" },
              }}
            >
              {problem.solution}
            </Typography>
          </Box>
        </Collapse>
      </Container>
    </>
  );
});
export default ProblemItem;
