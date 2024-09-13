import BookMarkFillIcon from "@/public/icons/bookmark-fill.svg";
import BookMarkLineIcon from "@/public/icons/bookmark-line.svg";
import { globalTheme } from "@/src/components/globalStyle";
import { CheckBox } from "@mui/icons-material";
import { Box, Pagination, ThemeProvider, Typography } from "@mui/material";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";

interface BookmarkProblemListProps {
  problems: BookMarkProblem[];
  selectedProblems: number[];
  selectProblem: (problemId: number) => void;
  handleBookmark: (problem: BookMarkProblem) => void;
  totalPage: number;
  handleChangePage: (page: number) => void;
}

const BookmarkProblemList: React.FC<BookmarkProblemListProps> = ({
  problems,
  selectedProblems,
  selectProblem,
  handleBookmark,
  totalPage,
  handleChangePage,
}: BookmarkProblemListProps) => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Box
        width="100%"
        mt="2px"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          paddingBottom: "100px",
        }}
      >
        <Box>
          {problems.map(problem => (
            <Box
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
                boxShadow: "none",
                border: "1px solid var(--c-gray2)",
                borderRadius: "12px",
                backgroundColor: "white",
                padding: "24px 20px",
              }}
              key={problem.problemId}
              marginY="16px"
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
                    handleBookmark(problem);
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
          ))}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination
            count={totalPage}
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "var(--c-sub1)",
              },
            }}
            onChange={(event, page) => {
              handleChangePage(page - 1);
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BookmarkProblemList;
