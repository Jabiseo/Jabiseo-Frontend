"use client";
import { useEffect, useState } from "react";
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
  SelectChangeEvent,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  const gotoStudyMode = () => {
    router.push("/study");
  };

  const gotoExamMode = () => {
    router.push("/exam");
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard-Regular",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            marginBottom: 4,
            marginTop: { xs: 0, md: 4 },
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              paddingBottom: 1,
              marginBottom: 2,
              display: "inline-block",
              fontWeight: { xs: 700, md: 800 },
              fontSize: { xs: "1.8rem", md: "2rem" },
            }}
          >
            기출 시험 문제 년도 설정
          </Typography>
          <Select
            value={year}
            onChange={handleYearChange}
            displayEmpty
            sx={{
              minWidth: 300,
              marginBottom: 4,
              borderRadius: 2,
              "&.MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--c-light-brown)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--c-light-brown)",
                },
              },
            }}
          >
            <MenuItem value="">무작위 모의고사</MenuItem>
            <MenuItem value={1}>2020년 3회</MenuItem>
            <MenuItem value={2}>2020년 2회</MenuItem>
            <MenuItem value={3}>2020년 1회</MenuItem>
          </Select>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h5" gutterBottom>
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
                        sx={{
                          color: "var(--c-light-brown)",
                          "&.Mui-checked": {
                            color: "var(--c-brown)",
                          },
                        }}
                      />
                    }
                    label={`${index + 1}과목: ${subject}`}
                  />
                </Grid>
              ))}
            </Box>{" "}
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6" gutterBottom mb={2}>
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
                min={1}
                max={20}
                valueLabelDisplay="auto"
                sx={{ color: "var(--c-green)" }}
              />
            </Box>{" "}
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h5" gutterBottom>
                선택한 총 문제수
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: "var(--c-brown)",
                }}
              >
                {numberOfQuestions}문제
              </Typography>
            </Box>{" "}
          </Grid>
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 4, marginBottom: 8 }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "var(--c-green)", borderRadius: "12px", minWidth: "150px" }}
            size="large"
            onClick={gotoStudyMode}
          >
            공부모드
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--c-light-brown)",
              color: "black",
              borderRadius: "12px",
              minWidth: "150px",
            }}
            size="large"
            onClick={gotoExamMode}
          >
            시험모드
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ExamSettings;
