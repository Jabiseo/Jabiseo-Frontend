import { Box, Button, Typography } from "@mui/material";
import StudyTime from "./studyTime";

interface ExamInfoUIProps {
  problem: ProblemViewType | null;
  isSm: boolean;
  handleSubmitModal: () => void;
  handleViewTime: (viewTime: string) => void;
  handleTime: (time: number) => void;
}

const ExamInfoUI: React.FC<ExamInfoUIProps> = ({
  problem,
  isSm,
  handleSubmitModal,
  handleViewTime,
  handleTime,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: "1px solid var(--c-gray2)",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: "70px",
        paddingX: "25px",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1165px",
        }}
      >
        {isSm ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" fontSize="12px">
                {problem?.subjectInfo.sequence}과목 {problem?.subjectInfo.name}
              </Typography>
              <StudyTime handleViewTime={handleViewTime} handleTime={handleTime} />
            </Box>

            <Button
              onClick={handleSubmitModal}
              sx={{
                marginLeft: 2,
                backgroundColor: "var(--c-main)",
                borderRadius: "40px",
                padding: "10px 28px",
                "&:hover": {
                  backgroundColor: "var(--c-main)",
                },
              }}
            >
              <Typography variant="h1" fontSize="12px" color="white">
                제출하기
              </Typography>
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" fontSize="20px">
              {problem?.subjectInfo.sequence}과목 {problem?.subjectInfo.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <StudyTime handleViewTime={handleViewTime} handleTime={handleTime} />
              <Button
                onClick={handleSubmitModal}
                sx={{
                  marginLeft: 2,
                  backgroundColor: "var(--c-main)",
                  borderRadius: "40px",
                  padding: "10px 28px",
                  "&:hover": {
                    backgroundColor: "var(--c-main)",
                  },
                }}
              >
                <Typography variant="h1" fontSize="20px" color="white">
                  제출하기
                </Typography>
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ExamInfoUI;
