import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CloseIcon from "@/public/icons/close-line.svg";

interface ProblemNumberListProps {
  handleOmrModal: () => void;
  setProblemNumber: (problemNumber: number) => void;
  problems: ProblemViewType[];
}

const ProblemNumberList: React.FC<ProblemNumberListProps> = React.memo(
  ({ handleOmrModal, setProblemNumber, problems }) => {
    const invisiblebuttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "900px",
          scrollbarWidth: "none",
          width: {
            xs: "80%",
            sm: "70%",
            md: "60%",
          },
          height: {
            xs: "70%",
            sm: "60%",
            md: "50%",
          },
          overflowY: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          paddingBottom: "16px",
          borderRadius: "20px",
        }}
      >
        <CloseIcon width={24} height={24} onClick={handleOmrModal} style={{ cursor: "pointer" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: 2,
          }}
        >
          <Typography
            variant="h1"
            fontSize={{
              xs: "12px",
              sm: "20px",
            }}
            mb={4}
          >
            번호를 누르시면 해당 문제로 이동합니다.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              {problems.map((problem, index) => (
                <Button
                  key={problem.problemId}
                  onClick={() => {
                    setProblemNumber(index + 1);
                    handleOmrModal();
                  }}
                  sx={{
                    backgroundColor:
                      problem.chooseNumber === -1
                        ? "white"
                        : problem.chooseNumber === problem.answerNumber
                        ? "var(--c-light-green)"
                        : "var(--c-light-red)",
                    border: "1.5px solid var(--c-gray5)",
                    borderRadius: "40px",
                    "&:hover": {
                      backgroundColor: "var(--c-gray2)",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontSize={{
                      xs: "12px",
                      sm: "16px",
                    }}
                  >
                    {index + 1 < 10 ? `00${index + 1}` : index + 1 < 100 ? `0${index + 1}` : "100"}
                  </Typography>
                </Button>
              ))}
              {invisiblebuttons.map(button => (
                <Button
                  key={button}
                  sx={{
                    visibility: "hidden",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontSize={{
                      xs: "12px",
                      sm: "16px",
                    }}
                  >
                    {button}
                  </Typography>
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

ProblemNumberList.displayName = "ProblemNumberList";

export default ProblemNumberList;
