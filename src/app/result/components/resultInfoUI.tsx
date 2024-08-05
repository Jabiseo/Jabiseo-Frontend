import { Box, Button, Typography } from "@mui/material";

interface ResultInfoUIProps {
  isSm: boolean;
  solvedProblem: string;
}

const ResultInfoUI: React.FC<ResultInfoUIProps> = ({ solvedProblem, isSm }) => {
  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: "0px 4px 16px #6A98A120",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: "70px",
        marginBottom: "56px",
        padding: "1px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          alignItems: "center",

          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1165px",
          paddingX: "25px",
          boxSizing: "border-box",
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
                맞은 문제 : {solvedProblem}
              </Typography>
              <Typography variant="h4" fontSize="12px">
                경과시간 : 3분 10초
              </Typography>
            </Box>

            <Button
              href="/"
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
                나가기
              </Typography>
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" fontSize="20px">
              맞은 문제 : {solvedProblem}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Typography variant="h4" fontSize="20px">
                경과시간 : 3분 10초
              </Typography>
              <Button
                href="/"
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
                  나가기
                </Typography>
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ResultInfoUI;
