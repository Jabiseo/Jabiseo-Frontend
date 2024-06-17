import { getProblems } from "@/src/api/types/apis/problem";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import SubjectSlider from "./subjectSlider";

const subjects = [
  { name: "awfaegsrgsf", subjectId: 1 },
  { name: "awfawgsegsrhser", subjectId: 2 },
  { name: "awfaegsrgsf", subjectId: 3 },
  { name: "awfawgsegsrhser", subjectId: 4 },
  { name: "awfaegsrgsf", subjectId: 5 },
  { name: "awfawgsegsrhser", subjectId: 6 },
];

const exams = [
  "2022년 3회차 기출 문제",
  "2022년 2회차 기출 문제",
  "2022년 1회차 기출 문제",
  "2021년 3회차 기출 문제",
  "2021년 2회차 기출 문제",
  "2021년 1회차 기출 문제",
];

const BookMarkMain = () => {
  const [selectedExam, setSelectedExam] = useState(exams[0]);
  const [problems, setProblems] = useState<BookMarkProblem[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<number[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const fetchedProblems = await getProblems();
      const parsedProblems = fetchedProblems.map(problem => {
        const bookmarkProblem: BookMarkProblem = {
          isBookmark: true,
          description: "",
          examInfo: { examId: 0, description: "" },
          problemId: 0,
          subject: { name: "", subjectId: 0 },
        };
        bookmarkProblem.isBookmark = true;
        bookmarkProblem.description = problem.description.split("<br>!")[0];
        bookmarkProblem.examInfo = problem.examInfo;
        bookmarkProblem.problemId = problem.problemId;
        bookmarkProblem.subject = problem.subject;
        return bookmarkProblem;
      });
      return setProblems(parsedProblems);
    };

    fetchProblems();
  }, []);

  const selectProblem = (problemId: number) => {
    if (selectedProblems.includes(problemId)) {
      setSelectedProblems(selectedProblems.filter(id => id !== problemId));
    } else {
      setSelectedProblems([...selectedProblems, problemId]);
    }
  };

  const selectAllProblems = () => {
    const allProblems = problems.map(problem => problem.problemId);
    setSelectedProblems(allProblems);
  };

  const deselectAllProblems = () => {
    setSelectedProblems([]);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        북마크
      </Typography>
      <SubjectSlider props={subjects} />
      <Box sx={{ mb: 2 }}>
        <Select value={selectedExam} onChange={e => setSelectedExam(e.target.value)} fullWidth>
          {exams.map(exam => (
            <MenuItem key={exam} value={exam}>
              {exam}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {problems.length} 문제
        </Typography>
        <Button variant="contained" sx={{ mr: 1 }} onClick={selectAllProblems}>
          전체 선택
        </Button>
        <Button variant="outlined" onClick={deselectAllProblems}>
          전체 해제
        </Button>
      </Box>

      <Grid container spacing={2}>
        {problems.map((problem, index) => (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  border: "2px solid black",
                },
                backgroundColor: selectedProblems.includes(problem.problemId)
                  ? "var(--c-light-red)"
                  : "",
              }}
              onClick={() => selectProblem(problem.problemId)}
            >
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <Box>
                  <Typography variant="h6">{problem.examInfo.description} 시험</Typography>
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
                    }}
                  >
                    {problem.description}
                  </Markdown>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookMarkMain;
