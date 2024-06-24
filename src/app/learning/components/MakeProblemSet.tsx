"use client";
import { globalTheme } from "@/src/components/globalStyle";
import useCertificateInfo from "@/src/hooks/useCertificateInfo";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
  List,
  ListItem,
  Radio,
  CircularProgress,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const marks = [
  { value: 0, label: "0" },
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

function valuetext(value: number) {
  return `${value}`;
}

const MakeProblemSetUI = () => {
  const { certificateInfo, loading, error } = useCertificateInfo();
  const [questionsCount, setQuestionsCount] = useState(20);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedExamId, setSelectedExamId] = useState<string>("0");
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const handleExamChange = (event: SelectChangeEvent<string>) => {
    setSelectedExam(event.target.value as string);
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

  useEffect(() => {
    if (certificateInfo === undefined) return;
    const subjects = certificateInfo?.subjects.map(subject => subject.name) || [];
    setSelectedSubjects(subjects);
  }, [certificateInfo]);

  const router = useRouter();
  const gotoStudyMode = () => {
    const certificateId = certificateInfo?.certificateId;
    const examId = selectedExamId;
    let path;
    if (examId === "0") {
      path = `/study/certificate-id=${certificateId}&subjectids=${selectedSubjects.join(
        ","
      )}&count=${questionsCount}`;
    } else {
      path = `/study/certificate-id=${certificateId}&exam-id=${examId}&subjectids=${selectedSubjects.join(
        ","
      )}&count=${questionsCount}`;
    }
    router.push(path);
  };

  const gotoExamMode = () => {
    const certificateId = certificateInfo?.certificateId;
    const examId = selectedExamId;
    let path;
    if (examId === "0") {
      path = `/exam/certificate-id=${certificateId}&subjectids=${selectedSubjects.join(
        ","
      )}&count=${questionsCount}`;
    } else {
      path = `/exam/certificate-id=${certificateId}&exam-id=${examId}&subjectids=${selectedSubjects.join(
        ","
      )}&count=${questionsCount}`;
    }
    router.push(path);
  };

  const rightBoxRef = useRef<HTMLDivElement | null>(null);
  const [leftBoxHeight, setLeftBoxHeight] = useState(0);
  const rightBoxRef2 = useRef<HTMLDivElement | null>(null);
  const [leftBoxHeight2, setLeftBoxHeight2] = useState(0);

  useEffect(() => {
    if (rightBoxRef.current) {
      setLeftBoxHeight(rightBoxRef.current.offsetHeight);
    }
    if (rightBoxRef2.current) {
      setLeftBoxHeight2(rightBoxRef2.current.offsetHeight);
    }
  }, [loading]);

  if (loading) {
    return (
      <ThemeProvider theme={globalTheme}>
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={globalTheme}>
      <Container>
        <Box>
          <Grid
            container
            spacing={{
              xs: 4,
              md: 8,
              lg: 12,
            }}
          >
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="body1">1. 연도를 선택해주세요</Typography>
                <Box
                  sx={{
                    marginTop: 2,
                    backgroundColor: "white",
                    borderRadius: "12px",
                    border: "1px solid var(--c-gray2)",
                    padding: "6px",
                    height: { md: `${leftBoxHeight}px` },
                    overflowY: "auto",
                  }}
                >
                  <List>
                    {certificateInfo &&
                      certificateInfo.exams.map(exam => (
                        <ListItem key={exam.examId}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={selectedExam === exam.description}
                                onChange={e => {
                                  handleExamChange(e);
                                  setSelectedExamId(exam.examId);
                                }}
                                value={exam.description}
                                sx={{
                                  "&.Mui-checked": {
                                    color: "var(--c-sub3)",
                                  },
                                }}
                              />
                            }
                            label={<Typography variant="body2">{exam.description}</Typography>}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="body1">2. 과목을 선택해주세요</Typography>
                <Box
                  ref={rightBoxRef}
                  sx={{
                    marginTop: 2,
                    backgroundColor: "white",
                    borderRadius: "12px",
                    border: "1px solid var(--c-gray2)",
                    padding: {
                      xs: "12px",
                      md: "36px",
                    },
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {certificateInfo &&
                    certificateInfo.subjects.map(subject => (
                      <FormControlLabel
                        key={subject.subjectId}
                        control={
                          <Checkbox
                            checked={selectedSubjects.includes(subject.name)}
                            onChange={handleSubjectChange}
                            value={subject.name}
                            sx={{
                              "&.Mui-checked": {
                                color: "var(--c-sub3)",
                              },
                            }}
                          />
                        }
                        label={<Typography variant="body2">{subject.name}</Typography>}
                      />
                    ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          mt={{
            xs: 4,
            md: 8,
          }}
        >
          <Grid
            container
            spacing={{
              xs: 4,
              md: 8,
              lg: 12,
            }}
          >
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="body1">3. 과목 문제 수를 설정해주세요</Typography>
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    border: "1px solid var(--c-gray2)",
                    height: { md: `${leftBoxHeight2}px` },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 4,
                    padding: 4,
                  }}
                >
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
                    valueLabelDisplay="auto"
                    sx={{ color: "var(--c-sub3)", width: "80%" }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="body1">4. 총 문제 수를 확인하세요</Typography>
                <Box
                  ref={rightBoxRef2}
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "row",
                    height: "100%",
                    mt: 4,
                    py: 6,
                  }}
                >
                  <Box sx={{ flexGrow: 1, p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mr: 2 }}>
                      <Typography variant="body2">선택 과목</Typography>
                      <Typography variant="body2">{selectedSubjects.length}과목</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mr: 2 }}>
                      <Typography variant="body2">과목 당 문제 수</Typography>
                      <Typography variant="body2">{questionsCount}문제</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid var(--c-sub3)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="body1">{numberOfQuestions}문제</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginTop: 12,
            marginBottom: 8,
          }}
        >
          <Button
            sx={{
              borderRadius: "40px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              px: {
                xs: 3,
                md: 6,
              },
              py: {
                xs: 3,
                md: 4,
              },
              backgroundColor: "white",
              border: "2px solid white",
              "&:hover": {
                border: "2px solid var(--c-sub3)",
                backgroundColor: "white",
              },
            }}
            onClick={gotoStudyMode}
          >
            <Typography
              sx={{
                color: "var(--c-sub4)",
                variant: {
                  xs: "body1",
                  md: "h3",
                },
              }}
            >
              공부 모드
            </Typography>
          </Button>
          <Button
            sx={{
              borderRadius: "40px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              px: {
                xs: 3,
                md: 6,
              },
              py: {
                xs: 3,
                md: 4,
              },
              backgroundColor: "white",
              border: "2px solid white",
              "&:hover": {
                border: "2px solid var(--c-sub3)",
                backgroundColor: "white",
              },
            }}
          >
            <Typography
              sx={{
                color: "var(--c-sub4)",
                variant: {
                  xs: "body1",
                  md: "h3",
                },
              }}
            >
              시험 모드
            </Typography>
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default MakeProblemSetUI;
