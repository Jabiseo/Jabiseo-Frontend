import { Box, Input } from "@mui/material";

const EditNickname = ({
  nickname,
  handleNicknameChange,
}: {
  nickname: string;
  handleNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Box>
      <Input
        value={nickname}
        onChange={handleNicknameChange}
        placeholder="닉네임을 입력하세요"
        disableUnderline={true}
        sx={{
          "& .MuiInput-input": {
            padding: "10px 14px",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid var(--c-gray2)",
            fontSize: {
              xs: "14px",
              sm: "18px",
            },
            fontFamily: "Pretendard-Regular",
            fontWeight: 400,
          },
          "&:before": {
            borderBottom: "1px solid var(--c-gray2)",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "1px solid var(--c-gray2)",
          },
          minWidth: {
            sm: "300px",
          },
        }}
      />
    </Box>
  );
};

export default EditNickname;
