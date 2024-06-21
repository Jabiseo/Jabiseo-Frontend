"use client";

import { mainfetch } from "@/src/api/apis/mainFetch";
import { globalTheme } from "@/src/components/globalStyle";
import useCertificates from "@/src/hooks/useCertificates";
import { ThemeProvider } from "@emotion/react";
import { Box, Menu, MenuItem, Typography, styled } from "@mui/material";
import { Certificate } from "crypto";
import { useEffect, useState } from "react";

const CustomMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    boxShadow: "0 0 5px 0 rgba(0, 0, 0, .2)",
    width: "100vw",
    left: 0,
    right: 0,
    marginLeft: 0,
    marginRight: 0,
  },
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },

  "&.Mui-selected .MuiTypography-root": {
    color: "var(--c-main)",
  },
}));

const StatusBox = () => {
  const { certificates } = useCertificates();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateType>({
    certificateId: "",
    name: "먼저 자격증을 골라주세요!",
  });

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
        <Box sx={{ mt: "64px", padding: "0" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid var(--c-gray2)",
              padding: "10px 0",
              boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.1)",
            }}
            onClick={handleClick}
          >
            <Typography variant="body1">{selectedCertificate.name}</Typography>
          </Box>
          <CustomMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose(null)}
          >
            {certificates.map(certificate => (
              <CustomMenuItem
                key={certificate.certificateId}
                selected={certificate.certificateId === selectedCertificate.certificateId}
                onClick={() => handleClose(certificate)}
              >
                <Typography variant="body2">{certificate.name}</Typography>
              </CustomMenuItem>
            ))}
          </CustomMenu>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default StatusBox;
