import BookMarkFillIcon from "@/public/icons/bookmark-fill.svg";
import BookMarkLineIcon from "@/public/icons/bookmark-line.svg";
import { Box, Typography } from "@mui/material";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";

interface SearchResultProblemProps {
  problem: BookMarkProblem;
  handleBookmark: (problemId: number) => void;
  gotoDetailPage: (problemId: number) => void;
}

const SearchResultProblem = ({
  problem,
  handleBookmark,
  gotoDetailPage,
}: SearchResultProblemProps) => {
  return (
    <Box
      sx={{
        "&:hover": {
          cursor: "pointer",
          border: "1px solid var(--c-sub3)",
        },
        boxShadow: "none",
        border: "1px solid var(--c-gray2)",
        borderRadius: "12px",
        backgroundColor: "white",
        padding: "24px 20px",
      }}
      marginY="16px"
      onClick={() => {
        gotoDetailPage(problem.problemId);
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              fontSize={{
                xs: "14px",
                sm: "20px",
              }}
              color="var(--c-gray4)"
              mb={1}
            >
              {problem.examInfo.description} ({problem.subjectInfo.name})
            </Typography>
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
                      variant="body2"
                      fontSize={{
                        xs: "14px",
                        sm: "20px",
                      }}
                    >
                      {content.children}
                    </Typography>
                  </Box>
                ),
                img: ({ node, ...content }) => <></>,
                br: ({ node, ...content }) => <></>,
              }}
            >
              {problem.description}
            </Markdown>
          </Box>
        </Box>

        <Box
          onClick={() => {
            handleBookmark(problem.problemId);
          }}
        >
          {problem.isBookmark ? (
            <BookMarkFillIcon width={32} height={24} />
          ) : (
            <BookMarkLineIcon width={32} height={24} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchResultProblem;
