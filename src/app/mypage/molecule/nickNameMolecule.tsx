import { Box, Typography } from "@mui/material";
import EditNickname from "../atom/editNickname";
import SaveButton from "../atom/saveButton";
import { useEffect, useState } from "react";
import { mainfetch } from "@/src/api/apis/mainFetch";

interface NickNameMoleculeProps {
  isEdit: Boolean;
  initialNickname: string;
  handleChangeNickname: (nickname: string) => void;
}

const NickNameMolecule = ({
  isEdit,
  initialNickname,
  handleChangeNickname,
}: NickNameMoleculeProps) => {
  const [nickname, setNickname] = useState(initialNickname);
  useEffect(() => {
    setNickname(initialNickname);
  }, [initialNickname]);
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleCancel = () => {
    setNickname(initialNickname);
  };
  const handleSave = () => {
    const fetchNickname = async () => {
      if (nickname === initialNickname || nickname.length === 0) {
        return;
      }
      const response = await mainfetch(
        "/members/myinfo/nickname",
        {
          method: "PATCH",
          body: {
            nickname: nickname,
          },
        },
        true
      );
      if (!response.ok) {
        alert("닉네임 변경에 실패했습니다.");
        return;
      }
      const data = await response.json();
      handleChangeNickname(data.nickname);
    };
    fetchNickname();
  };
  return (
    <Box
      sx={{
        marginBottom: "24px",
        width: "100%",
      }}
    >
      <Typography
        variant="h1"
        fontSize={{
          xs: "16px",
          sm: "20px",
        }}
      >
        닉네임
      </Typography>
      <Box
        marginY="20px"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {isEdit ? (
          <EditNickname nickname={nickname} handleNicknameChange={handleNicknameChange} />
        ) : (
          <Typography
            variant="body2"
            fontSize={{
              xs: "14px",
              sm: "18px",
            }}
          >
            {initialNickname}
          </Typography>
        )}
        {isEdit && <SaveButton handleCancel={handleCancel} handleSave={handleSave} />}
      </Box>
    </Box>
  );
};
export default NickNameMolecule;
