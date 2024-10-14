import { Box, Typography } from "@mui/material";
import CorrectRateCircle from "../atom/correctRateCircle";

interface StudyCurrentBoxProps {
  title: string;
  number: number;
  progress: number;
}

const StudyCurrentBox: React.FC<StudyCurrentBoxProps> = ({ title, number, progress }) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "36px 36px",
        width: "100%",
        maxWidth: "552px",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h1" sx={{ color: "var(--c-main)", fontSize: "24px" }}>
        {title}
      </Typography>
      <Box
        sx={{
          border: "1px solid #F2F2F2",
          width: "100%",
          marginY: {
            xs: "20px",
            sm: "32px",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          paddingX: {
            xs: "10px",
            md: "30px",
          },
          gap: {
            xs: "40px",
            md: "56px",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Typography variant="h4" fontSize={{ xs: "18px", md: "24px" }}>
            오늘의 학습 현황
          </Typography>
          <Typography variant="body1" fontSize={{ xs: "14px", md: "20px" }}>
            <Typography
              component="span"
              color="var(--c-point)"
              fontSize={{ xs: "14px", md: "20px" }}
              marginRight="4px"
            >
              {number}
            </Typography>
            <Typography component="span" variant="body1" fontSize={{ xs: "14px", md: "20px" }}>
              회 풀이
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontSize={{ xs: "18px", md: "24px" }}>
            오늘의 정답률
          </Typography>
          <CorrectRateCircle
            data={progress + "%"}
            rotateRightDegree={progress > 50 ? "180deg" : (progress / 50) * 180 + "deg"}
            rotateLeftDegree={progress > 50 ? ((progress - 50) / 50) * 180 + "deg" : "0deg"}
            fillBorderColor={"var(--c-point)"}
            emptyBorderColor={"var(--c-gray1)"}
            innerBackgroundColor={"#fff"}
            achive={false}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StudyCurrentBox;
