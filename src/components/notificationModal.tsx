"use client";
import { Modal, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NoHoverButton } from "./elements/styledElements";

const NotificationModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModal = () => {
    setModalOpen(!isModalOpen);
  };
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener("message", event => {
        if (event.data && event.data.type === "SHOW_MODAL") {
          // 전역 모달을 열거나 다른 상태를 변경하는 로직
          setModalOpen(true);
        }
      });
    }
    return () => {
      if (typeof window !== "undefined" && navigator.serviceWorker) {
        navigator.serviceWorker.removeEventListener("message", event => {
          if (event.data && event.data.type === "SHOW_MODAL") {
            setModalOpen(true);
          }
        });
      }
    };
  }, []);
  return (
    <Modal open={isModalOpen} onClose={handleModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "70%",
            sm: "60%",
            md: "50%",
            lg: "40%",
            xl: "40%",
          },

          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleModal}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h1" fontSize={28} mb={6}>
            문제 풀기
          </Typography>
          <Typography variant="body2" fontSize={24} mb={4}>
            모드를 선택해주세요
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
            <NoHoverButton
              onClick={() => {}}
              sx={{
                mr: 3,
                border: "1.5px solid var(--c-gray2)",
                borderRadius: "40px",
                padding: "12px 28px",
                "&:hover": {
                  border: "1.5px solid var(--c-sub3)",
                  filter: "drop-shadow(0px 1px 12px rgba(0, 0, 0, 0.16))",
                },
              }}
            >
              <Typography variant="h1" fontSize={20} color="var(--c-sub4)">
                공부 모드
              </Typography>
            </NoHoverButton>
            <NoHoverButton
              onClick={() => {}}
              sx={{
                border: "1.5px solid var(--c-gray2)",
                borderRadius: "40px",
                padding: "12px 28px",
                "&:hover": {
                  border: "1.5px solid var(--c-sub3)",
                  filter: "drop-shadow(0px 1px 12px rgba(0, 0, 0, 0.16))",
                },
              }}
            >
              <Typography variant="h1" fontSize={20} color="var(--c-sub4)">
                시험 모드
              </Typography>
            </NoHoverButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default NotificationModal;
