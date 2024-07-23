import { Avatar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import NotiIcon from "@/public/icons/noti.svg";
import SearchIcon from "@/public/icons/search.svg";
interface AppbarToolbarUIProps {
  isLogin: boolean;
  handleLogout: () => void;
  certificate: string;
}

const AppbarToolbarUI: React.FC<AppbarToolbarUIProps> = ({
  isLogin,
  handleLogout,
  certificate,
}) => {
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
          <Button href="/">
            <Image
              src="https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
              alt="Sitemark"
              width={20}
              height={20}
            />
            <Typography variant="h1" sx={{ color: "white", ml: 2 }} fontSize={"24px"}>
              자비서
            </Typography>
            {certificate !== "" && (
              <Typography
                variant="subtitle1"
                fontSize="16px"
                color="white"
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
          </Button>
          <Button sx={{ color: "black", display: { xs: "none", md: "flex" } }} href="/learning">
            <Typography variant="subtitle1" sx={{ color: "white", ml: 2 }} fontSize={"16px"}>
              문제풀이
            </Typography>
          </Button>
          <Button sx={{ color: "black", display: { xs: "none", md: "flex" } }} href="/bookmark">
            <Typography variant="subtitle1" sx={{ color: "white", ml: 2 }} fontSize={"16px"}>
              북마크
            </Typography>
          </Button>
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
            <Button
              variant="contained"
              sx={{
                marginLeft: 2,
                backgroundColor: "white",
                display: { xs: "none", md: "flex" },
                borderRadius: "30px",
                border: "1px solid var(--c-main)",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "white",
                  boxShadow: "none",
                },
              }}
              href="/login"
            >
              <Typography variant="h4" fontSize={"16px"} color="var(--c-main)">
                로그인
              </Typography>
            </Button>

            <Button href="/search" sx={{ padding: 0, minHeight: 0, minWidth: 0, mx: 1 }}>
              <Image src={SearchIcon} alt="search" width={24} height={24} />
            </Button>
          </>
        ) : (
          <>
            <Button href="/noti" sx={{ padding: 0, minHeight: 0, minWidth: 0, mx: 1 }}>
              <Image src={NotiIcon} alt="notification" width={24} height={24} />
            </Button>
            <Button href="/search" sx={{ padding: 0, minHeight: 0, minWidth: 0, mx: 1 }}>
              <Image src={SearchIcon} alt="search" width={24} height={24} />
            </Button>
            <IconButton href="/mypage" sx={{ display: { xs: "none", md: "flex" } }}>
              <Avatar alt="User" src="user-avatar.jpg" />
            </IconButton>
          </>
        )}
      </Box>
    </Toolbar>
  );
};

export default AppbarToolbarUI;
