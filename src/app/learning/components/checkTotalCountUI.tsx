import { Box, Typography } from "@mui/material";

interface CheckTotalCountUIProps {
  rightBoxRef2: any;
  selectedSubjects: Subject[];
  questionsCount: number;
  numberOfQuestions: number;
}

const CheckTotalCountUI: React.FC<CheckTotalCountUIProps> = ({
  rightBoxRef2,
  selectedSubjects,
  questionsCount,
  numberOfQuestions,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "520px",
        width: "100%",
      }}
    >
      <Typography variant="h4" fontSize="20px">
        4. 총 문제 수를 확인하세요
      </Typography>
      <Box
        ref={rightBoxRef2}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
          mt: 2,
          py: "35px",
        }}
      >
        <Box
          sx={{
            py: "27px",
            width: "50%",
            mr: "54px",
            ml: "34px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: "21px" }}>
            <Typography variant="body2">선택 과목</Typography>
            <Typography variant="body2">{selectedSubjects.length}과목</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">과목 문제 수</Typography>
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
            width: "50%",
            minHeight: "133px",
          }}
        >
          <Typography variant="body1">{numberOfQuestions}문제</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default CheckTotalCountUI;
