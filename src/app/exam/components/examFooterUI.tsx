import { Box, Button, Typography } from "@mui/material";

interface ExamFooterUIProps {
  handleOmrModal: () => void;
  problemNumber: number;
  problems: any;
  prevProblem: () => void;
  nextProblem: () => void;
  isMd: boolean;
}
const ExamFooterUI: React.FC<ExamFooterUIProps> = ({
  handleOmrModal,
  problemNumber,
  problems,
  prevProblem,
  nextProblem,
  isMd,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: "1px solid #ddd",
        backgroundColor: "var(--c-grey)",
        display: "flex",
        justifyContent: "center",
        paddingY: "26px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: isMd ? "space-between" : "center",
          alignItems: "center",
          flexDirection: "row",
          paddingX: {
            xs: "25px",
            md: "25px",
          },
        }}
      >
        {isMd && (
          <Button
            sx={{
              borderRadius: "40px",
              backgroundColor: "white",
              padding: {
                xs: "5px 14px",
                sm: "10px 28px",
              },
              "&:hover": {
                boxShadow: "0px 1px 12px rgba(0, 0, 0, 0.25)",
                backgroundColor: "white",
              },
            }}
            onClick={handleOmrModal}
          >
            <Typography
              variant="subtitle1"
              fontSize={{
                xs: "14px",
                sm: "18px",
              }}
              color="var(--c-main)"
            >
              Omr 보기
            </Typography>
          </Button>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "16px",
          }}
        >
          <Button
            sx={{
              visibility: problemNumber === 1 ? "hidden" : "visible",
              borderRadius: "40px",
              border: "1.5px solid var(--c-gray2)",
              padding: {
                xs: "5px 14px",
                sm: "10px 28px",
              },
            }}
            onClick={prevProblem}
          >
            <Typography
              variant="subtitle1"
              fontSize={{
                xs: "14px",
                sm: "18px",
              }}
            >
              이전
            </Typography>
          </Button>
          <Box
            minWidth={{
              xs: "40px",
              sm: "70px",
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              fontSize={{
                xs: "14px",
                sm: "18px",
              }}
            >
              {problemNumber}/{problems?.length}
            </Typography>
          </Box>
          <Button
            sx={{
              visibility: problemNumber === problems.length ? "hidden" : "visible",
              borderRadius: "40px",
              border: "1.5px solid var(--c-gray2)",
              padding: {
                xs: "5px 14px",
                sm: "10px 28px",
              },
            }}
            onClick={nextProblem}
          >
            <Typography
              variant="subtitle1"
              fontSize={{
                xs: "14px",
                sm: "18px",
              }}
            >
              다음
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ExamFooterUI;
