import { Box, Button, Typography } from "@mui/material";
import StudyTime from "./studyTime";

interface ExamInfoUIProps {
  problem: ProblemViewType | null;
  isMd: boolean;
  handleSubmitModal: () => void;
  handleViewTime: (viewTime: string) => void;
}

const ExamInfoUI: React.FC<ExamInfoUIProps> = ({
  problem,
  isMd,
  handleSubmitModal,
  handleViewTime,
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
        paddingX: {
          xs: "25px",
          md: "0px",
        },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1140px",
        }}
      >
        {isMd ? (
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
                {problem?.subject.sequence}과목 {problem?.subject.name}
              </Typography>
              <StudyTime handleViewTime={handleViewTime} />
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
              {problem?.subject.sequence}과목 {problem?.subject.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <StudyTime handleViewTime={handleViewTime} />
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
