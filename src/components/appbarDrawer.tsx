import { Avatar, Box, Button, Divider, Drawer, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@/public/icons/mingcute_close-line.svg";
import PersonLineIcon from "@/public/icons/person-line.svg";
import ArrowRightIcon from "@/public/icons/arrow-right.svg";

interface AppbarDrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  isLogin: boolean;
  handleLogout: () => void;
}

const AppbarDrawer: React.FC<AppbarDrawerProps> = ({
  open,
  toggleDrawer,
  isLogin,
  handleLogout,
}: AppbarDrawerProps) => {
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          minWidth: "100dvw",
          minHeight: "100vh",
          p: 2,
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
            <Image
              src="https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
              alt="Sitemark"
              width={20}
              height={20}
            />
            <Typography variant="h1" sx={{ ml: 2 }} fontSize={"24px"}>
              자비서
            </Typography>
          </Box>
          <Image
            src={CloseIcon}
            alt="close"
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
              <IconButton>
                <Avatar alt="User" src="user-avatar.jpg" />
              </IconButton>
              <Typography variant="h4" fontSize={"16px"} color="var(--c-gray5)">
                닉네임입니다
              </Typography>
            </Box>
          ) : (
            <Button
              variant="text"
              component="a"
              href="/login"
              target="_blank"
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
                <Image src={PersonLineIcon} sizes="22" alt="user" />
                <Typography variant="subtitle1" fontSize={"14px"} color="white" ml={1}>
                  로그인을 해주세요
                </Typography>
              </Box>
              <Image src={ArrowRightIcon} sizes="16" alt="arrowright" />
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
              {/* 
              박스 맨 아래에 존재 할 박스
            */}
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
