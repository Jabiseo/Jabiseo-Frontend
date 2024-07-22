import { globalTheme } from "@/src/components/globalStyle";
import { CheckBox } from "@mui/icons-material";
import { Box, Card, CardContent, Grid, ThemeProvider, Typography } from "@mui/material";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import BookMarkIcon from "@/public/icons/clarity_bookmark-line.svg";
import Image from "next/image";

interface BookmarkProblemListProps {
  problems: BookMarkProblem[];
  selectedProblems: string[];
  selectProblem: (problemId: string) => void;
  deleteBookmark: (problemId: string) => void;
}

const BookmarkProblemList: React.FC<BookmarkProblemListProps> = ({
  problems,
  selectedProblems,
  selectProblem,
  deleteBookmark,
}: BookmarkProblemListProps) => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Grid container spacing={2} width="100%" mt={4}>
        {problems.map(problem => (
          <Grid item xs={12} key={problem.problemId}>
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
                    <Typography variant="subtitle1" fontSize="20px" color="var(--c-gray4)" mb={1}>
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
                    deleteBookmark(problem.problemId);
                  }}
                >
                  <Image src={BookMarkIcon} alt="bookmark" width={32} height={24} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default BookmarkProblemList;
