import { Box, Button, Typography } from "@mui/material";

interface SaveButtonProps {
  handleSave: () => void;
  handleCancel: () => void;
}

const SaveButton = ({ handleSave, handleCancel }: SaveButtonProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "10px",
      }}
    >
      <Button
        sx={{
          marginRight: {
            xs: "12px",
            sm: "20px",
          },
          padding: {
            xs: "6px 12px",
            sm: "8px 18px",
          },
          backgroundColor: "var(--c-main)",
          borderRadius: "40px",
          "&:hover": {
            backgroundColor: "var(--c-main)",
          },
        }}
        onClick={handleSave}
      >
        <Typography
          variant="body2"
          fontSize={{
            xs: "12px",
            sm: "16px",
          }}
          color="white"
        >
          저장
        </Typography>
      </Button>
      <Button
        sx={{
          padding: {
            xs: "6px 12px",
            sm: "8px 18px",
          },
          backgroundColor: "white",
          borderRadius: "40px",
          "&:hover": {
            backgroundColor: "white",
          },
        }}
        onClick={handleCancel}
      >
        <Typography
          variant="body2"
          fontSize={{
            xs: "12px",
            sm: "16px",
          }}
        >
          취소
        </Typography>
      </Button>
    </Box>
  );
};

export default SaveButton;
