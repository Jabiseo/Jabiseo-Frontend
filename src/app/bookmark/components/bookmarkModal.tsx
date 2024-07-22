import { globalTheme } from "@/src/components/globalStyle";
import { Box, Button, Modal, ThemeProvider, Typography } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@/public/icons/mingcute_close-line.svg";
interface BookMarkModalProps {
  isModalOpen: boolean;
  handleModal: () => void;
  gotoStudyMode: () => void;
  gotoExamMode: () => void;
}

const BookMarkModal: React.FC<BookMarkModalProps> = ({
  isModalOpen,
  gotoExamMode,
  gotoStudyMode,
  handleModal,
}) => {
  return (
    <ThemeProvider theme={globalTheme}>
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
          >
            <Image src={CloseIcon} width={28} height={28} alt="X" />
          </Box>
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
              <Button
                onClick={gotoStudyMode}
                sx={{
                  mr: 3,
                  border: "1.5px solid var(--c-gray2)",
                  borderRadius: "40px",
                  padding: "12px 28px",
                }}
              >
                <Typography variant="h1" fontSize={20} color="var(--c-sub4)">
                  공부 모드
                </Typography>
              </Button>
              <Button
                onClick={gotoExamMode}
                sx={{
                  border: "1.5px solid var(--c-gray2)",
                  borderRadius: "40px",
                  padding: "12px 28px",
                }}
              >
                <Typography variant="h1" fontSize={20} color="var(--c-sub4)">
                  시험 모드
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};
export default BookMarkModal;
