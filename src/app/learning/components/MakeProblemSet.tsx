"use client";
import { globalTheme } from "@/src/components/globalStyle";
import useCertificateInfo from "@/src/hooks/useCertificateInfo";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Radio,
  SelectChangeEvent,
  Slider,
  Typography,
  useMediaQuery,
  ThemeProvider,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";

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
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
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
    setSelectedSubjects(prevSelectedSubjects => {
      // subject.name이 value와 일치하는지 확인하는 함수
      const isSelected = prevSelectedSubjects.some(subject => subject.name === value);

      // 만약 isSelected가 true이면 해당 항목을 제거한 배열을 반환
      if (isSelected) {
        return prevSelectedSubjects.filter(subject => subject.name !== value);
      } else {
        // isSelected가 false이면 해당 항목을 추가한 배열을 반환
        const selectedSubject = certificateInfo?.subjects.find(subject => subject.name === value);
        if (selectedSubject) {
          return [...prevSelectedSubjects, selectedSubject];
        } else {
          // 만약 해당하는 subject.name을 찾지 못했을 경우 기존 배열을 반환
          return prevSelectedSubjects;
        }
      }
    });
  };

  useEffect(() => {
    if (certificateInfo === undefined) return;
    const subjects = certificateInfo?.subjects;
    setSelectedSubjects(subjects);
  }, [certificateInfo]);

  const router = useRouter();
  const gotoStudyMode = () => {
    const certificateId = certificateInfo?.certificateId;
    const examId = selectedExamId;
    let path;
    if (examId === "0") {
      path = `/study/certificate-id=${certificateId}&subject-id=${selectedSubjects
        .map(subject => subject.subjectId)
        .join(",")}&count=${questionsCount}`;
    } else {
      path = `/study/certificate-id=${certificateId}&exam-id=${examId}&subject-id=${selectedSubjects
        .map(subject => subject.subjectId)
        .join(",")}&count=${questionsCount}`;
    }
    router.push(path);
  };

  const gotoExamMode = () => {
    const certificateId = certificateInfo?.certificateId;
    const examId = selectedExamId;
    let path;
    if (examId === "0") {
      path = `/exam/certificate-id=${certificateId}&subject-id=${selectedSubjects
        .map(subject => subject.subjectId)
        .join(",")}&count=${questionsCount}`;
    } else {
      path = `/exam/certificate-id=${certificateId}&exam-id=${examId}&subject-id=${selectedSubjects
        .map(subject => subject.subjectId)
        .join(",")}&count=${questionsCount}`;
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

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

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
            }}
          >
            <Grid item xs={12} sm={5.5}>
              <Box>
                <Typography
                  variant="body1"
                  fontSize={{
                    xs: "16px",
                    sm: "20px",
                  }}
                >
                  1. 연도를 선택해주세요
                </Typography>
                <Box
                  sx={{
                    marginTop: 2,
                    backgroundColor: "white",
                    borderRadius: "14px",
                    border: "1px solid var(--c-gray2)",
                    padding: "6px",
                    height: { sm: `${leftBoxHeight}px` },
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
                                checked={selectedExamId === exam.examId}
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
                            label={
                              <Typography
                                variant="body2"
                                fontSize={{
                                  xs: "14px",
                                  sm: "20px",
                                }}
                              >
                                {exam.description}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                  </List>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={0} sm={1}></Grid>
            <Grid item xs={12} sm={5.5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="body1"
                  fontSize={{
                    xs: "16px",
                    sm: "20px",
                  }}
                >
                  2. 과목을 선택해주세요
                </Typography>
                <Box
                  ref={rightBoxRef}
                  sx={{
                    marginTop: 2,
                    backgroundColor: "white",
                    borderRadius: "14px",
                    border: "1px solid var(--c-gray2)",
                    padding: {
                      xs: "14px",
                      sm: "36px",
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
                            checked={selectedSubjects.includes(subject)}
                            onChange={handleSubjectChange}
                            value={subject.name}
                            sx={{
                              "&.Mui-checked": {
                                color: "var(--c-sub3)",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography
                            variant="body2"
                            fontSize={{
                              xs: "14px",
                              sm: "20px",
                            }}
                          >
                            {subject.name}
                          </Typography>
                        }
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
            sm: 8,
          }}
        >
          {!isSm ? (
            <Grid
              container
              spacing={{
                xs: 4,
              }}
            >
              <Grid item xs={12} sm={5.5}>
                <Box>
                  <Typography
                    variant="body1"
                    fontSize={{
                      xs: "16px",
                      sm: "20px",
                    }}
                  >
                    3. 과목 문제 수를 설정해주세요
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "14px",
                      border: "1px solid var(--c-gray2)",
                      height: { sm: `${leftBoxHeight2}px` },
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
                      sx={{
                        color: "var(--c-sub3)",
                        width: "80%",
                        "& .MuiSlider-thumb": {
                          boxShadow: "0 0 0 10px rgba(68,187,212, 0.16)",
                        },
                        "& .MuiSlider-thumb:hover": {
                          boxShadow: "0 0 0 10px rgba(68,187,212, 0.16)",
                        },
                        "& .MuiSlider-thumbActive": {
                          boxShadow: "0 0 0 10px rgba(68,187,212, 0.16)",
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={1}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BsChevronDoubleRight size={"50px"} />
              </Grid>
              <Grid item xs={12} sm={5.5}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontSize={{
                      xs: "16px",
                      sm: "20px",
                    }}
                  >
                    4. 총 문제 수를 확인하세요
                  </Typography>
                  <Box
                    ref={rightBoxRef2}
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "row",
                      height: "100%",
                      mt: 2,
                      py: 6,
                    }}
                  >
                    <Box sx={{ flexGrow: 1, p: 1 }}>
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
                        borderRadius: "14px",
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
          ) : (
            <>
              <Typography
                variant="body1"
                fontSize={{
                  xs: "16px",
                  sm: "20px",
                }}
              >
                3. 과목 문제 수 설정과 총 문제 수 확인해주세요.
              </Typography>
              <Box
                sx={{
                  backgroundColor: "white",
                  mt: 4,
                  paddingX: 1.5,
                  paddingY: 1,
                  borderRadius: "8px",
                  border: "1px solid var(--c-gray2)",
                  minHeight: "160px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={5.5}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        padding: 2,
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
                        sx={{
                          color: "var(--c-sub3)",
                          width: "100%",
                          "& .MuiSlider-markLabel": {
                            fontSize: "14px",
                          },
                        }}
                        size="medium"
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BsChevronDoubleRight size={"20px"} />
                  </Grid>
                  <Grid
                    item
                    xs={5.5}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" fontSize={"14px"}>
                          선택 과목
                        </Typography>
                        <Typography variant="body2" fontSize={"14px"}>
                          {selectedSubjects.length}과목
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" fontSize={"14px"}>
                          과목 문제 수
                        </Typography>
                        <Typography variant="body2" fontSize={"14px"}>
                          {questionsCount}문제
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1" fontSize={"12px"} color={"var(--c-gray3)"}>
                        총 문제수
                      </Typography>
                      <Box
                        sx={{
                          backgroundColor: "white",
                          border: "1px solid var(--c-sub3)",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          py: 1,
                          width: "70%",
                          mt: 0.5,
                        }}
                      >
                        <Typography variant="body1" fontSize={"14px"}>
                          {numberOfQuestions}문제
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: {
              xs: 3,
              sm: 6,
            },
            marginTop: {
              xs: 6,
              sm: 12,
            },
            marginBottom: 8,
          }}
        >
          <Button
            sx={{
              borderRadius: "40px",
              boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
              px: {
                xs: 3,
                sm: 6,
              },
              py: {
                xs: 2,
                sm: 2,
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
                  sm: "h3",
                },
                fontSize: { xs: "16px", sm: "20px" },
              }}
            >
              공부 모드
            </Typography>
          </Button>
          <Button
            sx={{
              borderRadius: "40px",
              boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
              px: {
                xs: 3,
                sm: 6,
              },
              py: {
                xs: 2,
                sm: 2,
              },
              backgroundColor: "white",
              border: "2px solid white",
              "&:hover": {
                border: "2px solid var(--c-sub3)",
                backgroundColor: "white",
              },
            }}
            onClick={gotoExamMode}
          >
            <Typography
              sx={{
                color: "var(--c-sub4)",
                variant: {
                  xs: "body1",
                  sm: "h3",
                },
                fontSize: { xs: "16px", sm: "20px" },
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
