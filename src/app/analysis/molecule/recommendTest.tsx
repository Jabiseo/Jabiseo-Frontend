import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import RecommendTestModal from "./recommendTestModal";

const RecommendTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "var(--c-sub5)",
        height: {
          xs: "100px",
          sm: "210px",
        },
        display: "flex",
        justifyContent: "center",
        marginBottom: {
          xs: "54px",
          sm: "108px",
        },
      }}
    >
      <Box
        sx={{
          maxWidth: "1165px",
          paddingX: {
            xs: "22px",
            sm: "25px",
          },
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: {
              xs: "12px",
              sm: "20px",
            },
          }}
        >
          <Typography
            variant="h1"
            fontSize={{
              xs: "20px",
              sm: "32px",
            }}
            color="white"
          >
            추천 모의고사
          </Typography>
          <Typography
            variant="subtitle1"
            fontSize={{
              xs: "12px",
              sm: "24px",
            }}
            color="white"
          >
            자비서가 취약한 문제들을 골라줘요!
          </Typography>
        </Box>
        <Box>
          <Button
            disableTouchRipple
            disableFocusRipple
            sx={{
              backgroundColor: "white",
              padding: {
                xs: "8px 16px",
                sm: "16px 32px",
              },
              borderRadius: "40px",
              "&:hover": {
                backgroundColor: "white",
              },
              transition: "none",
            }}
            onClick={handleModal}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "14px",
                  sm: "24px",
                },
                color: "var(--c-main)",
              }}
            >
              추천 모의고사 풀기
            </Typography>
          </Button>
        </Box>
      </Box>
      <RecommendTestModal isModalOpen={isModalOpen} handleModal={handleModal} />
    </Box>
  );
};

export default RecommendTest;
