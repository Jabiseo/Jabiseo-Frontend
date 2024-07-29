import { Box, Button, Typography } from "@mui/material";

import CloseIcon from "@/public/icons/close-line.svg";
import { NoHoverButton } from "@/src/components/elements/styledElements";
interface SubmitResultUIProps {
  handleSubmitModal: () => void;
  sendResult: () => void;
  solvedProblemsNumber: string;
  viewTime: string;
}

const SubmitResultUI: React.FC<SubmitResultUIProps> = ({
  handleSubmitModal,
  sendResult,
  solvedProblemsNumber,
  viewTime,
}) => {
  return (
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
        },
        bgcolor: "white",
        filter: "drop-shadow(0px 2px 26px rgba(0, 0, 0, 0.25))",
        p: 4,
        borderRadius: "20px",
      }}
    >
      <CloseIcon width={28} height={28} onClick={handleSubmitModal} style={{ cursor: "pointer" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "36px",
        }}
      >
        <Typography
          variant="h1"
          fontSize={{
            xs: "20px",
            sm: "28px",
          }}
        >
          안내사항
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "36px",
        }}
      >
        <Typography
          variant="body2"
          fontSize={{
            xs: "16px",
            sm: "24px",
          }}
        >
          정말 공부를 종료 하시겠습니까?
        </Typography>
        <Typography
          variant="body2"
          fontSize={{
            xs: "16px",
            sm: "24px",
          }}
        >
          공부를 종료하시면 다시 문제를 풀 수 없습니다.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "36px",
        }}
      >
        <Typography
          variant="h1"
          fontSize={{
            xs: "16px",
            sm: "24px",
          }}
          marginBottom="16px"
        >
          푼 문제 : {solvedProblemsNumber}
        </Typography>
        <Typography
          variant="h1"
          fontSize={{
            xs: "16px",
            sm: "24px",
          }}
        >
          경과 시간 : {viewTime}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NoHoverButton
          sx={{
            borderRadius: "40px",
            padding: "10px 32px",
            marginRight: "56px",
            border: "1.5px solid var(--c-gray3)",
          }}
          onClick={handleSubmitModal}
        >
          <Typography
            variant="subtitle1"
            fontSize={{
              xs: "16px",
              sm: "20px",
            }}
          >
            취소
          </Typography>
        </NoHoverButton>
        <Button
          sx={{
            borderRadius: "40px",
            padding: "10px 32px",
            backgroundColor: "var(--c-red)",
            "&:hover": {
              backgroundColor: "var(--c-red)",
            },
          }}
          onClick={sendResult}
        >
          <Typography
            variant="subtitle1"
            fontSize={{
              xs: "16px",
              sm: "20px",
            }}
            color="white"
          >
            종료
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default SubmitResultUI;
