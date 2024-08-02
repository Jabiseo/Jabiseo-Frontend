import { mainfetch } from "@/src/api/apis/mainFetch";
import { Box, Button, Typography } from "@mui/material";

const LogoutMolecule = ({ handleEdit, isEdit }: { handleEdit: () => void; isEdit: boolean }) => {
  const handleLogout = async () => {
    await mainfetch(
      "/auth/logout",
      {
        method: "POST",
      },
      true
    );
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "40px",
        marginBottom: "90px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography
          mx={2}
          variant="subtitle1"
          fontSize="16px"
          sx={{
            textDecoration: "underline",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          color="var(--c-red)"
          onClick={handleLogout}
        >
          로그아웃
        </Typography>
        <Typography
          mx={2}
          variant="subtitle1"
          fontSize="16px"
          sx={{
            textDecoration: "underline",
          }}
          color="var(--c-gray3)"
        >
          회원탈퇴
        </Typography>
      </Box>
      {isEdit ? (
        <Button
          disableTouchRipple
          sx={{
            borderRadius: "40px",
            backgroundColor: "white",
            padding: "8px 18px",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          onClick={handleEdit}
        >
          <Typography
            variant="subtitle1"
            fontSize={{
              xs: "12px",
              sm: "16px",
            }}
            color="black"
          >
            나가기
          </Typography>
        </Button>
      ) : (
        <Button
          disableTouchRipple
          sx={{
            borderRadius: "40px",
            backgroundColor: "var(--c-main)",
            padding: "8px 18px",
            "&:hover": {
              backgroundColor: "var(--c-main)",
            },
          }}
          onClick={handleEdit}
        >
          <Typography
            variant="subtitle1"
            fontSize={{
              xs: "12px",
              sm: "16px",
            }}
            color="white"
          >
            수정하기
          </Typography>
        </Button>
      )}
    </Box>
  );
};
export default LogoutMolecule;
