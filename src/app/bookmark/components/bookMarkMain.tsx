"use client";
import { mainfetch } from "@/src/api/apis/mainFetch";
import { MiddleBoxColumn, NoHoverButton } from "@/src/components/elements/styledElements";
import { globalTheme } from "@/src/components/globalStyle";
import useBookmarks from "@/src/hooks/useBookmarks";
import useCertificateInfo from "@/src/hooks/useCertificateInfo";
import { Box, Button, Grid, SelectChangeEvent, ThemeProvider, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import BookMarkModal from "./bookmarkModal";
import ExamChoice from "./examChoice";
import BookmarkProblemList from "./problemList";
import SubjectChoice from "./subjectChoice";
import handleBookmarkModule from "@/src/api/apis/handleBookmark";

const MAX_SELECTED_PROBLEMS = 100;

const BookMarkMain = () => {
  const [selectedExam, setSelectedExam] = useState<string>("전체 회차");
  const [problems, setProblems] = useState<BookMarkProblem[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<number[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<number>(0);
  const [selectedSubjectsId, setSelectedSubjectsId] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { bookmarkedProblems, totalPage, isCertified, certificateInfo, loading, totalCount } =
    useBookmarks({
      selectedExamId,
      selectedSubjectsId,
      page,
    });
  const handleModalOpen = () => {
    setisModalOpen(prev => !prev);
  };

  const gotoStudyMode = async () => {
    if (selectedProblems.length === 0) {
      return;
    }
    const getProblmes = async () => {
      const problems = await mainfetch(
        "/problems/set/query",
        {
          method: "POST",
          body: {
            problemIds: selectedProblems,
          },
        },
        true
      );
      if (!problems.ok) {
        new Error("문제를 불러오는데 실패했습니다.");
      }
      const data = await problems.json();
      localStorage.setItem("bookmarkProblems", JSON.stringify(data));
    };
    await getProblmes();
    const path = `/study/bookmark`;
    window.location.href = path;
  };
  const gotoExamMode = async () => {
    if (selectedProblems.length === 0) {
      return;
    }
    const getProblmes = async () => {
      const problems = await mainfetch(
        "/problems/set/query",
        {
          method: "POST",
          body: {
            problemIds: selectedProblems,
          },
        },
        true
      );
      if (!problems.ok) {
        new Error("문제를 불러오는데 실패했습니다.");
      }
      const data = await problems.json();
      localStorage.setItem("bookmarkProblems", JSON.stringify(data));
    };
    await getProblmes();
    const path = `/exam/bookmark`;
    window.location.href = path;
  };
  useEffect(() => {
    setProblems(bookmarkedProblems);
  }, [bookmarkedProblems]);

  const selectProblem = (problemId: number) => {
    if (selectedProblems.includes(problemId)) {
      setSelectedProblems(selectedProblems.filter(id => id !== problemId));
    } else if (selectedProblems.length < MAX_SELECTED_PROBLEMS) {
      setSelectedProblems([...selectedProblems, problemId]);
    }
  };

  const handleBookmark = useCallback(
    (problem: BookMarkProblem) => {
      handleBookmarkModule<BookMarkProblem>(problem, isProcessing, setIsProcessing, setProblems);
    },
    [isProcessing, setIsProcessing, setProblems]
  );

  const selectAllProblems = () => {
    const allProblems = problems.map(problem => problem.problemId);
    setSelectedProblems(allProblems.slice(0, MAX_SELECTED_PROBLEMS));
  };

  const deselectAllProblems = () => {
    setSelectedProblems([]);
  };

  const handleExamChoice = (event: SelectChangeEvent) => {
    setSelectedExam(event.target.value as string);
    const examId = certificateInfo!.exams.find(
      exam => exam.description === event.target.value
    )!.examId;
    setSelectedExamId(examId);
  };

  useEffect(() => {
    if (certificateInfo === undefined) return;
    const subjects = certificateInfo.subjects;
    setSelectedSubjects(subjects);
    setSelectedExam(certificateInfo.exams[0].description);
    setSelectedSubjectsId(subjects.map(subject => subject.subjectId));
  }, [certificateInfo]);

  const handleSubjectChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const getNewSelectedSubjects = () => {
      const isSelected = selectedSubjects.some(subject => subject.name === value);

      // 만약 isSelected가 true이면 해당 항목을 제거한 배열을 반환
      if (isSelected) {
        return selectedSubjects.filter(subject => subject.name !== value);
      } else {
        // isSelected가 false이면 해당 항목을 추가한 배열을 반환
        const selectedSubject = certificateInfo?.subjects.find(subject => subject.name === value);
        if (selectedSubject) {
          return [...selectedSubjects, selectedSubject];
        } else {
          // 만약 해당하는 subject.name을 찾지 못했을 경우 기존 배열을 반환
          return selectedSubjects;
        }
      }
    };
    const newSelectedSubjects = getNewSelectedSubjects();
    setSelectedSubjects(newSelectedSubjects);
    // const newSelectedSubjectsId = [];
    setSelectedSubjectsId(newSelectedSubjects.map(subject => subject.subjectId));
  };

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (!isCertified) {
    window.location.href = "/mypage";
    return (
      <ThemeProvider theme={globalTheme}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography
            variant="h1"
            fontSize="28px"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            먼저 자격증을 선택해주세요
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={globalTheme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "160px",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ mt: 12 }} maxWidth="1140px" height="100%" width="90%">
          <Grid container spacing={3} minHeight="80vh" width="100%">
            <Grid item xs={4}>
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
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                borderLeft: "1px solid var(--c-gray2)",
              }}
            >
              <Box sx={{ mb: "40px" }}>
                <Typography variant="h4" fontSize="28px" mb="40px">
                  북마크
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <NoHoverButton
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
                    </NoHoverButton>
                    <NoHoverButton
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
                    </NoHoverButton>
                  </Box>
                  <Button
                    onClick={handleModalOpen}
                    sx={{
                      border: "1.5px solid var(--c-main)",
                      borderRadius: "40px",
                      padding: "4px 28px",
                      backgroundColor: "var(--c-main)",
                      "&:hover": {
                        backgroundColor: "var(--c-main)",
                      },
                    }}
                  >
                    <Typography variant="body2" fontSize="16px" color="white">
                      문제풀기
                    </Typography>
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize="18px" variant="subtitle1">
                    총&nbsp;
                  </Typography>
                  <Typography fontSize="18px" variant="subtitle1" color="var(--c-main)">
                    {totalCount}
                  </Typography>
                  <Typography fontSize="18px" variant="subtitle1">
                    개의 북마크
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize="18px" variant="subtitle1" color="var(--c-main)">
                    {selectedProblems.length}
                  </Typography>
                  <Typography fontSize="18px" variant="subtitle1">
                    개 선택
                  </Typography>
                </Box>
              </Box>
              <BookmarkProblemList
                totalPage={totalPage}
                handleChangePage={handleChangePage}
                problems={problems}
                selectedProblems={selectedProblems}
                selectProblem={selectProblem}
                handleBookmark={handleBookmark}
              />
            </Grid>
          </Grid>
        </Box>
        <BookMarkModal
          isModalOpen={isModalOpen}
          handleModal={handleModalOpen}
          gotoStudyMode={gotoStudyMode}
          gotoExamMode={gotoExamMode}
        />
      </Box>
    </ThemeProvider>
  );
};

export default BookMarkMain;
