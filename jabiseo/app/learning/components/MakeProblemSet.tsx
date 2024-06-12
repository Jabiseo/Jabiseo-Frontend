"use client";
import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Slider,
  Button,
  Container,
  Paper,
  SelectChangeEvent,
} from "@mui/material";

const marks = [
  { value: 0, label: "0" },
  { value: 20, label: "20" },
];

function valuetext(value: number) {
  return `${value}`;
}

const ExamSettings = () => {
  const [year, setYear] = useState("");
  const [questionsCount, setQuestionsCount] = useState(20);
  const [numberOfQuestions, setNumberOfQuestions] = useState(20);
  const [selectedSubjects, setSelectedSubjects] = useState([
    "소프트웨어 설계",
    "소프트웨어 개발",
    "데이터베이스 구축",
    "프로그래밍 언어 활용",
    "정보시스템 구축관리",
  ]);

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    console.log(event);
    setYear(event.target.value as string);
  };

  const handleQuestionsCountChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    setQuestionsCount(value as number);
  };

  useEffect(() => {
    setNumberOfQuestions(questionsCount * selectedSubjects.length);
  }, [questionsCount, selectedSubjects]);

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedSubjects(prev =>
      prev.includes(value) ? prev.filter(subject => subject !== value) : [...prev, value]
    );
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 4,
          marginTop: { xs: 0, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={500}
          fontFamily={"sans-serif"}
          sx={{
            borderBottom: "2px solid #3f51b5",
            paddingBottom: 1,
            marginBottom: 2,
            display: "inline-block",
            fontWeight: { xs: 500, md: 500 },
            fontSize: { xs: "1.8rem", md: "2rem" },
          }}
        >
          기출 시험 문제 년도 설정
        </Typography>
        <Select
          value={year}
          onChange={handleYearChange}
          displayEmpty
          sx={{ minWidth: 300, marginBottom: 4 }}
        >
          <MenuItem value="">무작위 모의고사</MenuItem>
          <MenuItem value={1}>2020년 3회</MenuItem>
          <MenuItem value={2}>2020년 2회</MenuItem>
          <MenuItem value={3}>2020년 1회</MenuItem>
        </Select>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              과목 선택
            </Typography>
            {[
              "소프트웨어 설계",
              "소프트웨어 개발",
              "데이터베이스 구축",
              "프로그래밍 언어 활용",
              "정보시스템 구축관리",
            ].map((subject, index) => (
              <Grid item xs={12} key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedSubjects.includes(subject)}
                      onChange={handleSubjectChange}
                      value={subject}
                    />
                  }
                  label={`${index + 1}과목: ${subject}`}
                />
              </Grid>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              문제 수 선택
            </Typography>
            <Slider
              aria-label="Question Count"
              defaultValue={20}
              value={questionsCount}
              onChange={handleQuestionsCountChange}
              getAriaValueText={valuetext}
              step={1}
              marks={marks}
              min={0}
              max={20}
              valueLabelDisplay="on"
            />
          </Paper>
          <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h5" gutterBottom>
              선택한 총 문제수
            </Typography>
            <Typography variant="h4" sx={{ color: "primary.main" }}>
              {numberOfQuestions}문제
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 4 }}>
        <Button variant="contained" color="primary" size="large">
          공부모드
        </Button>
        <Button variant="contained" color="secondary" size="large">
          시험모드
        </Button>
      </Box>
    </Container>
  );
};

export default ExamSettings;
