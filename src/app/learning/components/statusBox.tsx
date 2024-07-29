"use client";

import ArrowDownIcon from "@/public/icons/arrow-down.svg";
import { mainfetch } from "@/src/api/apis/mainFetch";
import { globalTheme } from "@/src/components/globalStyle";
import useCertificates from "@/src/hooks/useCertificates";
import { ThemeProvider } from "@emotion/react";
import { Box, Menu, MenuItem, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const CustomMenu = styled(Menu)(() => ({
  "& .MuiPaper-root": {
    width: "100vw",
    left: 0,
    right: 0,
    marginLeft: 0,
    marginRight: 0,
  },
}));

const CustomMenuItem = styled(MenuItem)(() => ({
  justifyContent: "center",
  width: "100%",

  "&.Mui-selected:focus": {
    color: "var(--c-main)",
    backgroundColor: "white",
  },
  "&.Mui-selected": {
    color: "var(--c-main)",
  },
}));

const StatusBox = () => {
  const { certificates } = useCertificates();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateType>({
    certificateId: 0,
    name: "먼저 자격증을 골라주세요!",
  });
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down(960));

  useEffect(() => {
    const myCertificate = localStorage.getItem("certificate");
    if (myCertificate) {
      setSelectedCertificate(JSON.parse(myCertificate));
    }
  }, []);

  const handleMyCertificate = () => {
    localStorage.setItem("certificate", JSON.stringify(selectedCertificate));
    if (localStorage.getItem("accessToken") !== null) {
      mainfetch(
        "/members/myinfo/certificates",
        { method: "PATCH", body: selectedCertificate },
        true
      );
    }
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    handleMyCertificate();
  };

  const handleClose = (certificate: CertificateType | null) => {
    setAnchorEl(null);
    if (certificate) {
      setSelectedCertificate(certificate);
    }
  };

  return (
    <>
      <ThemeProvider theme={globalTheme}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid var(--c-gray2)",
            filter: "drop-shadow(0px 2px 16px #6A98A120)",
            padding: "26px 60px",
            backgroundColor: "white",
            marginBottom: "40px",
            width: "100%",
          }}
          onClick={handleClick}
        >
          <Typography
            variant="h4"
            fontSize={{
              xs: "14px",
              md: "28px",
            }}
            marginRight="8px"
          >
            {selectedCertificate.name}
          </Typography>
          {!isMd ? (
            <ArrowDownIcon width={28} heigth={28} />
          ) : (
            <ArrowDownIcon width={17} heigth={17} />
          )}
        </Box>
        <CustomMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose(null)}>
          {certificates.map(certificate => (
            <CustomMenuItem
              key={certificate.certificateId}
              selected={certificate.certificateId === selectedCertificate.certificateId}
              onClick={() => handleClose(certificate)}
            >
              <Typography
                variant="h4"
                fontSize={{
                  xs: "12px",
                  md: "24px",
                }}
                sx={{
                  color:
                    certificate.name == selectedCertificate.name
                      ? "var(--c-main)"
                      : "var(--c-gray5)",
                }}
              >
                {certificate.name}
              </Typography>
            </CustomMenuItem>
          ))}
        </CustomMenu>
      </ThemeProvider>
    </>
  );
};

export default StatusBox;
