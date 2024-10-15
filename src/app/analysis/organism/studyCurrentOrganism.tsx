import ArrawRight from "@/public/icons/arrow-right.svg";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import StudyCurrentBox from "../molecule/studyCurrentBox";
import { useEffect, useState } from "react";
import { mainfetch } from "@/src/api/apis/mainFetch";
import LodingUI from "@/src/components/lodingUI";
const StudyCurrentOrganism = () => {
  const [analysisToday, setAnalysisToday] = useState<AnalysisToday>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAnalysisToday = async () => {
      try {
        const response = await mainfetch(
          "/analyses/today",
          {
            method: "GET",
          },
          true
        );
        const data = await response.json();
        setAnalysisToday(data);
      } finally {
        setIsLoading(false);
      }
    };
    getAnalysisToday();
  }, []);

  if (isLoading) {
    return <LodingUI />;
  }
  return (
    <Box
      sx={{
        marginTop: {
          xs: "20px",
          sm: "36px",
        },
        marginBottom: {
          xs: "40px",
          sm: "80px",
        },
      }}
    >
      <Typography
        variant="h1"
        fontSize={{
          xs: "18px",
          sm: "28px",
        }}
        marginBottom={{
          xs: "20px",
          sm: "36px",
        }}
      >
        학습 현황
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "36px",
          justifyItems: "center",
          width: "100%",
        }}
      >
        <StudyCurrentBox
          title="공부모드"
          number={analysisToday!.studyModeCount}
          progress={analysisToday!.studyModeCorrectRate}
        />
        <StudyCurrentBox
          title="시험모드"
          number={analysisToday!.examModeCount}
          progress={analysisToday!.examModeCorrectRate}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: {
            xs: "36px",
            sm: "56px",
          },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          disableTouchRipple
          disableFocusRipple
          sx={{
            backgroundColor: "white",
            filter: "drop-shadow(0px 1px 12px #00000016)",
            padding: {
              xs: "8px 16px",
              sm: "16px 32px",
            },
            borderRadius: "40px",
            "&:hover": {
              backgroundColor: "white",
              filter: "drop-shadow(0px 1px 12px #00000050)",
            },
            transition: "none",
          }}
          href="/studyplan"
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: {
                xs: "12px",
                sm: "20px",
              },
              color: "var(--c-main)",
              marginRight: "8px",
            }}
          >
            학습 플랜 확인하기
          </Typography>
          <ArrawRight width={26} height={24} />
        </Button>
      </Box>
    </Box>
  );
};
export default StudyCurrentOrganism;
