import NotiIcon from "@/public/icons/noti.svg";
import SearchIcon from "@/public/icons/search.svg";
import PersionIcon from "@/public/icons/person-line-nofill.svg";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import favicon from "@/public/favicon.ico";
interface AppbarToolbarUIProps {
  isLogin: boolean;
  handleLogout: () => void;
  certificate: string;
  fontColor: string;
  focusTap: string;
  isScroll?: number;
}

const AppbarToolbarUI: React.FC<AppbarToolbarUIProps> = ({
  isLogin,
  certificate,
  fontColor,
  focusTap,
  isScroll,
}) => {
  const [scrollState, setScrollState] = useState<boolean>(true);

  useEffect(() => {
    if (isScroll === undefined) return;
    if (isScroll >= 40) {
      setScrollState(true);
    } else {
      setScrollState(false);
    }
  }, [isScroll]);
  return (
    <Toolbar
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        "&.MuiToolbar-root": {
          padding: 0,
        },
      }}
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NoHoverTouchButton
            href="/"
            onClick={() => {
              localStorage.setItem("focusTap", "");
            }}
          >
            <Image src={favicon} alt="favicon" width={40} height={40} />
            <Typography variant="h1" sx={{ color: fontColor, ml: 2 }} fontSize={"24px"}>
              자비서
            </Typography>
            {certificate !== "" && (
              <Typography
                variant="subtitle1"
                fontSize="16px"
                color={scrollState ? "var(--c-sub5)" : "white"}
                sx={{
                  mx: 2,
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                }}
              >
                {certificate}
              </Typography>
            )}
          </NoHoverTouchButton>
          <NoHoverTouchButton
            sx={{ color: "black", display: { xs: "none", md: "flex" } }}
            href="/learning"
            onClick={() => {
              localStorage.setItem("focusTap", "문제풀이");
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color:
                  focusTap === "문제풀이" ? (scrollState ? "var(--c-main)" : "white") : fontColor,
                filter:
                  focusTap === "문제풀이"
                    ? scrollState
                      ? "none"
                      : "drop-shadow(0px 1px 4px #16396F)"
                    : "none",
              }}
              fontSize={"16px"}
            >
              문제풀이
            </Typography>
          </NoHoverTouchButton>
          <NoHoverTouchButton
            sx={{ color: "black", display: { xs: "none", md: "flex" } }}
            href="/bookmark"
            onClick={() => {
              localStorage.setItem("focusTap", "북마크");
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color:
                  focusTap === "북마크" ? (scrollState ? "var(--c-main)" : "white") : fontColor,
                filter:
                  focusTap === "북마크"
                    ? scrollState
                      ? "none"
                      : "drop-shadow(0px 1px 4px #16396F)"
                    : "none",
              }}
              fontSize={"16px"}
            >
              북마크
            </Typography>
          </NoHoverTouchButton>
          <NoHoverTouchButton
            sx={{ color: "black", display: { xs: "none", md: "flex" } }}
            href="/assistant"
            onClick={() => {
              localStorage.setItem("focusTap", "학습비서");
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color:
                  focusTap === "학습비서" ? (scrollState ? "var(--c-main)" : "white") : fontColor,
                filter:
                  focusTap === "학습비서"
                    ? scrollState
                      ? "none"
                      : "drop-shadow(0px 1px 4px #16396F)"
                    : "none",
              }}
              fontSize={"16px"}
            >
              학습비서
            </Typography>
          </NoHoverTouchButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {!isLogin ? (
          <>
            <NoHoverTouchButton
              sx={{
                marginLeft: 2,
                backgroundColor: "white",
                display: { xs: "none", md: "flex" },
                borderRadius: "30px",
                border: "1px solid var(--c-main)",
                boxShadow: "none",
                "&:hover": {
                  backgroundcolor: "white",
                  boxShadow: "none",
                },
              }}
              href="/login"
            >
              <Typography variant="h4" fontSize={"16px"} color="var(--c-main)">
                로그인
              </Typography>
            </NoHoverTouchButton>

            <NoHoverTouchButton
              href="/search"
              sx={{ padding: 0, minHeight: 0, minWidth: 0, mx: 1 }}
            >
              <SearchIcon width={24} height={24} color={fontColor} />
            </NoHoverTouchButton>
          </>
        ) : (
          <>
            <NoHoverTouchButton
              href="/mypage"
              sx={{
                padding: 0,
                minHeight: 0,
                minWidth: 0,
                mx: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              <PersionIcon width={28} height={28} color={fontColor} />
            </NoHoverTouchButton>
            <NoHoverTouchButton href="/noti" sx={{ padding: 0, minHeight: 0, minWidth: 0, mx: 1 }}>
              <NotiIcon width={24} height={24} color={fontColor} />
            </NoHoverTouchButton>
            <NoHoverTouchButton
              href="/search"
              sx={{ padding: 0, minHeight: 0, minWidth: 0, mx: 1 }}
            >
              <SearchIcon width={28} height={28} color={fontColor} />
            </NoHoverTouchButton>
          </>
        )}
      </Box>
    </Toolbar>
  );
};

export default AppbarToolbarUI;

const NoHoverTouchButton: React.FC<NoHoverTouchButtonProps> = ({ sx, children, onClick, href }) => {
  return (
    <Button
      disableTouchRipple
      sx={{
        "&:hover": {
          backgroundColor: "inherit",
        },
        ...sx,
      }}
      onClick={onClick}
      href={href}
    >
      {children}
    </Button>
  );
};
interface NoHoverTouchButtonProps {
  sx?: object;
  children: React.ReactNode;
  onClick?: () => any;
  href?: string;
}
