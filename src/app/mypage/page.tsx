"use client";

import AppBar from "@/src/components/Appbar";
import { MiddleBoxColumn } from "@/src/components/elements/styledElements";
import Footer from "@/src/components/Footer";
import { globalTheme } from "@/src/components/globalStyle";
import useUserInfo from "@/src/hooks/useUserInfo";
import { Box, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import NickNameMolecule from "./molecule/nickNameMolecule";
import ProfileMolecule from "./molecule/profileMolecule";
import MyPageContentTemplate from "./template/myPageContentTemplate";
import EmailAtom from "./atom/emailAtom";
import CertificateMolecule from "./molecule/certificateMolecure";
import LogoutMolecule from "./molecule/logoutMolecure";

const MyPage = () => {
  const { userInfo, loading, error, certificate, certificates } = useUserInfo();
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [myCertificate, setMyCertificate] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangeNickname = (nickname: string) => {
    setNickname(nickname);
  };

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname);
      setProfileImage(userInfo.profileImage);
      setEmail(userInfo.email);
    }
    if (certificate) {
      setMyCertificate(certificate);
    }
  }, [userInfo, certificate]);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ThemeProvider theme={globalTheme}>
      <AppBar />
      <MiddleBoxColumn marginTop="76px">
        <MyPageContentTemplate>
          <Box
            sx={{
              width: "100%",
            }}
            marginY="68px"
          >
            <Typography
              variant="h1"
              fontSize={{
                xs: "18px",
                sm: "32px",
              }}
              align="center"
            >
              마이 페이지
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              paddingY: "20px",
              borderBottom: "1px solid var(--c-gray2)",
            }}
          >
            <Typography
              variant="h1"
              fontSize={{
                xs: "16px",
                sm: "28px",
              }}
            >
              계정 정보
            </Typography>
          </Box>
          <ProfileMolecule profileImage={profileImage} isSm={isSm} isEdit={isEdit} />
          <NickNameMolecule
            isEdit={isEdit}
            initialNickname={nickname}
            handleChangeNickname={handleChangeNickname}
          />
          <EmailAtom email={email} />
          <CertificateMolecule
            isEdit={isEdit}
            certificate={myCertificate}
            certificates={certificates}
            setMyCertificate={setMyCertificate}
          />
          <LogoutMolecule isEdit={isEdit} handleEdit={handleEdit} />
        </MyPageContentTemplate>
      </MiddleBoxColumn>
      <Footer />
    </ThemeProvider>
  );
};

export default MyPage;
