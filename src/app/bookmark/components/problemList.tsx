import BookMarkLineIcon from "@/public/icons/bookmark-line.svg";
import BookMarkFillIcon from "@/public/icons/bookmark-fill.svg";
import { globalTheme } from "@/src/components/globalStyle";
import { CheckBox } from "@mui/icons-material";
import { Box, Card, CardContent, ThemeProvider, Typography } from "@mui/material";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";

interface BookmarkProblemListProps {
  problems: BookMarkProblem[];
  selectedProblems: string[];
  selectProblem: (problemId: string) => void;
  handleBookmark: (problemId: string) => void;
}

const BookmarkProblemList: React.FC<BookmarkProblemListProps> = ({
  problems,
  selectedProblems,
  selectProblem,
  handleBookmark,
}: BookmarkProblemListProps) => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Box width="100%" mt="12px">
        {problems.map(problem => (
          <Box key={problem.problemId} marginY="16px">
            <Card
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
                boxShadow: "none",
              }}
            >
              <CardContent
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
                  onClick={() => selectProblem(problem.problemId)}
                >
                  <CheckBox
                    sx={{
                      color: selectedProblems.includes(problem.problemId)
                        ? "var(--c-sub3)"
                        : "var(--c-gray2)",
                      marginRight: "10px",
                      marginTop: "5px",
                    }}
                  />
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
                      {problem.examInfo.description} ({problem.subject.name})
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
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default BookmarkProblemList;
