"use client";
import useCertificateInfo from "@/src/hooks/useCertificateInfo";
import { Box, Button, Collapse, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BookMarkModal from "./bookmarkModal";
import ExamChoice from "./examChoice";
import BookmarkProblemList from "./problemList";
import SubjectChoice from "./subjectChoice";
import BookMarkSlider from "./bookMarkSlider";
const MobileBookMarkMain = () => {
  const { certificateInfo, loading, error } = useCertificateInfo();
  const [selectedExam, setSelectedExam] = useState<string>("전체 회차");
  const [problems, setProblems] = useState<BookMarkProblem[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const handleSliderOpen = () => {
    setIsSliderOpen(prev => !prev);
  };
  const handleModalOpen = () => {
    setisModalOpen(prev => !prev);
  };

  const gotoStudyMode = () => {
    // 공부 모드로 이동하는 함수
  };
  const gotoExamMode = () => {
    // 시험 모드로 이동하는 함수
  };
  useEffect(() => {
    const t: BookMarkProblem[] = [
      {
        problemId: "1",
        examInfo: {
          examId: "1",
          description: "2022년 1,2회",
        },
        subject: {
          subjectId: "1",
          sequence: 2,
          name: "소프트웨어 설계",
        },
        isBookmark: true,
        description: "UML 다이어그램 중 순차 다이어그램에 대한 설명으로 틀린 것은?",
      },
      {
        problemId: "2",
        examInfo: {
          examId: "1",
          description: "2022년 1,2회",
        },
        subject: {
          subjectId: "1",
          sequence: 2,
          name: "소프트웨어 설계",
        },
        isBookmark: true,
        description: "UML 다이어그램 중 순차 다이어그램에 대한 설명으로 틀린 것은?",
      },
      {
        problemId: "3",
        examInfo: {
          examId: "1",
          description: "2022년 1,2회",
        },
        subject: {
          subjectId: "1",
          sequence: 2,
          name: "소프트웨어 설계",
        },
        isBookmark: true,
        description: "UML 다이어그램 중 순차 다이어그램에 대한 설명으로 틀린 것은?",
      },
    ];
    setProblems(t);
  }, []);
  const selectProblem = (problemId: string) => {
    if (selectedProblems.includes(problemId)) {
      setSelectedProblems(selectedProblems.filter(id => id !== problemId));
    } else {
      setSelectedProblems([...selectedProblems, problemId]);
    }
  };
  /**
   *
   * @param problemId
   * 북마크 삭제 api 추가 예정
   */
  const deleteBookmark = (problemId: string) => {
    setProblems(problems.filter(problem => problem.problemId !== problemId));
  };

  const selectAllProblems = () => {
    const allProblems = problems.map(problem => problem.problemId);
    setSelectedProblems(allProblems);
  };

  const deselectAllProblems = () => {
    setSelectedProblems([]);
  };

  const handleExamChoice = (event: SelectChangeEvent) => {
    setSelectedExam(event.target.value as string);
  };

  useEffect(() => {
    if (certificateInfo === undefined) return;
    const subjects = certificateInfo.subjects;
    setSelectedSubjects(subjects);
    setSelectedExam(certificateInfo.exams[0].description);
  }, [certificateInfo]);

  const handleSubjectChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: "130px",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ mt: 12 }} height="100%" width="90%">
        <BookMarkSlider
          handleSliderOpen={handleSliderOpen}
          selectedSubjects={selectedSubjects}
          selectedExam={selectedExam}
        />
        <Collapse in={isSliderOpen}>
          <SubjectChoice
            subjects={certificateInfo!.subjects}
            handleSubjectChoice={handleSubjectChoice}
            selectedSubjects={selectedSubjects}
          />
          <ExamChoice
            exams={certificateInfo!.exams}
            handleExamChoice={handleExamChoice}
            selectedExam={selectedExam!}
          />
        </Collapse>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" gutterBottom fontSize="28px">
            북마크
          </Typography>
          <Typography variant="h6" gutterBottom>
            {problems.length} 문제
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Button
                onClick={selectAllProblems}
                sx={{
                  mr: 1,
                  border: "1.5px solid var(--c-gray2)",
                  borderRadius: "40px",
                  padding: "4px 18px",
                }}
              >
                <Typography variant="body2" fontSize="16px" color="var(--c-gray5)">
                  전체 선택
                </Typography>
              </Button>
              <Button
                onClick={deselectAllProblems}
                sx={{
                  border: "1.5px solid var(--c-gray2)",
                  borderRadius: "40px",
                  padding: "4px 18px",
                }}
              >
                <Typography variant="body2" fontSize="16px" color="var(--c-gray3)">
                  전체 해제
                </Typography>
              </Button>
            </Box>
            <Button
              onClick={handleModalOpen}
              sx={{
                border: "1.5px solid var(--c-main)",
                borderRadius: "40px",
                padding: "4px 28px",
                backgroundColor: "var(--c-main)",
              }}
            >
              <Typography variant="body2" fontSize="16px" color="white">
                문제풀기
              </Typography>
            </Button>
          </Box>
        </Box>
        <BookmarkProblemList
          problems={problems}
          selectedProblems={selectedProblems}
          selectProblem={selectProblem}
          deleteBookmark={deleteBookmark}
        />
      </Box>
      <BookMarkModal
        isModalOpen={isModalOpen}
        handleModal={handleModalOpen}
        gotoStudyMode={gotoStudyMode}
        gotoExamMode={gotoExamMode}
      />
    </Box>
  );
};

export default MobileBookMarkMain;
