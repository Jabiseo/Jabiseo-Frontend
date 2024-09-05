import ArrowRightIcon from "@/public/icons/arrow-right.svg";
import CloseIcon from "@/public/icons/close-line.svg";
import PersonLineIcon from "@/public/icons/person-line.svg";
import { Box, Button, Divider, Drawer, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import favicon from "@/public/favicon.ico";
interface AppbarDrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  isLogin: boolean;
  handleLogout: () => void;
  userInfo?: { nickname: string; profileImage: string };
}

const AppbarDrawer: React.FC<AppbarDrawerProps> = ({
  open,
  toggleDrawer,
  isLogin,
  handleLogout,
  userInfo,
}: AppbarDrawerProps) => {
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          minWidth: "90dvw",
          p: 3,
          backgroundColor: "var(--c-gray1)",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image src={favicon} alt="Sitemark" width={20} height={20} />
            <Typography variant="h1" sx={{ ml: 2 }} fontSize={"24px"}>
              자비서
            </Typography>
          </Box>
          <CloseIcon
            width={24}
            height={24}
            onClick={toggleDrawer(false)}
            style={{ cursor: "pointer" }}
          />
        </Box>

        <Box>
          {isLogin ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{
                  borderRadius: "50%",
                }}
                href="/mypage"
              >
                <Image
                  src={userInfo ? userInfo.profileImage : ""}
                  alt="profile"
                  width={40}
                  height={40}
                  style={{
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
              <Typography variant="h4" fontSize={"16px"} color="var(--c-gray5)">
                {userInfo?.nickname}
              </Typography>
            </Box>
          ) : (
            <Button
              href="/login"
              disableTouchRipple
              sx={{
                width: "100%",
                backgroundColor: "var(--c-sub5)",
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "var(--c-sub5)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PersonLineIcon width={22} height={22} />
                <Typography variant="subtitle1" fontSize={"14px"} color="white" ml={1}>
                  로그인을 해주세요
                </Typography>
              </Box>
              <ArrowRightIcon width={22} height={22} color={"white"} />
            </Button>
          )}
        </Box>
        <Typography
          variant="body2"
          fontSize={"14px"}
          color={"var(--c-gray4)"}
          sx={{ mt: 4, mb: 2 }}
        >
          카테고리
        </Typography>
        <Divider />

        <Box
          sx={{
            py: 3,
            textDecoration: "none",
          }}
          component={"a"}
          href="/learning"
        >
          <Typography variant="h4" fontSize={"18px"} color="var(--c-gray5)">
            문제풀이
          </Typography>
        </Box>
        <Box
          sx={{
            py: 3,
            textDecoration: "none",
          }}
          component={"a"}
          href="/bookmark"
        >
          <Typography variant="h4" fontSize={"18px"} color="var(--c-gray5)">
            북마크
          </Typography>
        </Box>
        <Box
          sx={{
            py: 3,
            textDecoration: "none",
          }}
          component={"a"}
          href="/assistant"
        >
          <Typography variant="h4" fontSize={"18px"} color="var(--c-gray5)">
            학습 비서
          </Typography>
        </Box>
        {!isLogin || (
          <>
            <Box
              sx={{
                py: 3,
                textDecoration: "none",
              }}
              component={"a"}
              href="/mypage"
            >
              <Typography variant="h4" fontSize={"18px"} color="var(--c-gray5)">
                마이페이지
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                position: "absolute",
                bottom: 150,
                left: 0,
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
          </>
        )}
      </Box>
    </Drawer>
  );
};
export default AppbarDrawer;
