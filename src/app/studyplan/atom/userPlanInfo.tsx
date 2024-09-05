import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type UserInfo = {
  nickname: string;
  profileImage: string;
};

const UserPlanInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [certificateInfo, setCertificateInfo] = useState<CertificateType | null>(null);
  useEffect(() => {
    const getUserInfo = localStorage.getItem("userInfo");
    const getCertificateInfo = localStorage.getItem("certificate");
    if (getUserInfo) {
      setUserInfo(JSON.parse(getUserInfo));
    }
    if (getCertificateInfo) {
      setCertificateInfo(JSON.parse(getCertificateInfo));
    }
  }, []);
  if (!userInfo || !certificateInfo) {
    return <>로딩중...</>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        paddingX: {
          xs: "22px",
          sm: "0px",
        },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            sm: "flex-start",
          },
        }}
      >
        <Typography
          variant="h1"
          fontSize={{
            xs: "18px",
            sm: "32px",
          }}
          marginBottom={{
            xs: "20px",
            sm: "44px",
          }}
        >
          {userInfo!.nickname}님의&nbsp;
          <Typography
            component="span"
            variant="h1"
            color="var(--c-main)"
            fontSize={{
              xs: "18px",
              sm: "32px",
            }}
          >
            {certificateInfo!.name}&nbsp;
          </Typography>
          학습 플랜
        </Typography>
      </Box>
    </Box>
  );
};

export default UserPlanInfo;
