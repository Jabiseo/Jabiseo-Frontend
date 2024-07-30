"use client";
import { globalTheme } from "@/src/components/globalStyle";
import useCertificateInfo from "@/src/hooks/useCertificateInfo";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  SelectChangeEvent,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ArrowDoubleRight from "@/public/icons/arrow-double-right.svg";
import { MiddleBoxColumn } from "@/src/components/elements/styledElements";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CheckTotalCountUI from "./checkTotalCountUI";
import SelectExamUI from "./selectExamUI";
import SelectProblemCountUI from "./selectProblemCountUI";
import SelectSubjectUI from "./selectSubjectUI";
import MobileCountAndCheckUI from "./mobileCountAndCheckUI";

const MakeProblemSetUI = () => {
  const { certificateInfo, loading, error } = useCertificateInfo();
  const [questionsCount, setQuestionsCount] = useState(20);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [selectedExam, setSelectedExam] = useState("전체 회차");
  const [selectedExamId, setSelectedExamId] = useState<number>(0);
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
    if (examId === 0) {
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
    if (examId === 0) {
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
  const isMd = useMediaQuery(theme.breakpoints.down(960));

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
      <MiddleBoxColumn
        maxWidth="1165px"
        sx={{
          paddingX: "25px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            marginTop: {
              xs: 4,
              md: 8,
            },
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <SelectExamUI
            exams={certificateInfo!.exams}
            selectedExamId={selectedExamId}
            handleExamChange={handleExamChange}
            setSelectedExamId={setSelectedExamId}
            leftBoxHeight={leftBoxHeight}
          />
          <Box minWidth="70px" />
          <SelectSubjectUI
            subjects={certificateInfo!.subjects}
            selectedSubjects={selectedSubjects}
            handleSubjectChange={handleSubjectChange}
            rightBoxRef={rightBoxRef}
          />
        </Box>
        {isMd ? (
          <MobileCountAndCheckUI
            selectedSubjects={selectedSubjects}
            questionsCount={questionsCount}
            numberOfQuestions={numberOfQuestions}
            handleQuestionsCountChange={handleQuestionsCountChange}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              marginTop: {
                xs: 4,
                md: 8,
              },
              justifyContent: "space-around",
              width: "100%",
              alignItems: "center",
            }}
          >
            <SelectProblemCountUI
              questionsCount={questionsCount}
              handleQuestionsCountChange={handleQuestionsCountChange}
              leftBoxHeight2={leftBoxHeight2}
            />
            <Box minWidth="70px" pt="54px">
              <ArrowDoubleRight width={62} heigth={62} />
            </Box>
            <CheckTotalCountUI
              selectedSubjects={selectedSubjects}
              questionsCount={questionsCount}
              numberOfQuestions={numberOfQuestions}
              rightBoxRef2={rightBoxRef2}
            />
          </Box>
        )}

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
              filter: "drop-shadow(0px 2px 16px #6A98A120)",
              py: {
                xs: "12px",
                sm: "20px",
              },
              px: {
                xs: "28px",
                sm: "48px",
              },
              backgroundColor: "white",
              border: "2px solid var(--c-gray2)",
              "&:hover": {
                border: "2px solid var(--c-sub3)",
                backgroundColor: "white",
              },
            }}
            onClick={gotoStudyMode}
          >
            <Typography
              variant="h1"
              sx={{
                color: "var(--c-sub4)",
                fontSize: { xs: "14px", sm: "20px" },
              }}
            >
              공부 모드
            </Typography>
          </Button>
          <Button
            sx={{
              borderRadius: "40px",
              filter: "drop-shadow(0px 2px 16px #6A98A120)",
              py: {
                xs: "12px",
                sm: "20px",
              },
              px: {
                xs: "28px",
                sm: "48px",
              },
              backgroundColor: "white",
              border: "2px solid var(--c-gray2)",
              "&:hover": {
                border: "2px solid var(--c-sub3)",
                backgroundColor: "white",
              },
            }}
            onClick={gotoExamMode}
          >
            <Typography
              variant="h1"
              sx={{
                color: "var(--c-sub4)",

                fontSize: { xs: "14px", sm: "20px" },
              }}
            >
              시험 모드
            </Typography>
          </Button>
        </Box>
      </MiddleBoxColumn>
    </ThemeProvider>
  );
};

export default MakeProblemSetUI;
