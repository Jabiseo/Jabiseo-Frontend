import {
  Box,
  Button,
  Container,
  Select,
  Typography,
  MenuItem,
  Grid,
  CardContent,
  Card,
} from "@mui/material";
import SubjectSlider from "./subjectSlider";
import { useEffect, useState } from "react";
import { getProblems } from "@/src/api/types/apis/problem";

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
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const fetchedProblems = await getProblems();
      setProblems(fetchedProblems);
    };

    fetchProblems();
  }, []);

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
        <Button variant="contained" sx={{ mr: 1 }}>
          전체 선택
        </Button>
        <Button variant="outlined">전체 해제</Button>
      </Box>

      <Grid container spacing={2}>
        {problems.map((problem, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <Box>
                  <Typography variant="h6">
                    {problem.examInfo.year}회 {problem.examInfo.round}회 시험
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {problem.description}
                  </Typography>
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
