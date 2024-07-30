"use client";

import ArrowDownIcon from "@/public/icons/arrow-down.svg";
import { mainfetch } from "@/src/api/apis/mainFetch";
import { globalTheme } from "@/src/components/globalStyle";
import useCertificates from "@/src/hooks/useCertificates";
import { ThemeProvider } from "@emotion/react";
import { Box, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const DropdownContainer = styled(Box)(({}) => ({
  position: "relative",
  width: "100%",
}));

const DropdownButton = styled(Box)(({}) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid var(--c-gray2)",
  filter: "drop-shadow(0px 2px 16px #6A98A120)",
  padding: "26px 60px",
  backgroundColor: "white",
  width: "100%",
  boxSizing: "border-box",
  cursor: "pointer",
}));

const DropdownList = styled(Box)(({}) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: "white",
  border: "1px solid var(--c-gray2)",
  borderTop: "none",
  maxHeight: "300px",
  overflowY: "auto",
  zIndex: 1,
}));

const DropdownItem = styled(Typography)<{ isSelected: boolean }>(({ isSelected }) => ({
  padding: "16px",
  textAlign: "center",
  cursor: "pointer",
  color: isSelected ? "var(--c-main)" : "var(--c-gray5)",
  "&:hover": {
    backgroundColor: "var(--c-gray1)",
  },
}));

const StatusBox = () => {
  const { certificates } = useCertificates();
  const [isOpen, setIsOpen] = useState(false);
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
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    handleMyCertificate();
  };

  const handleSelect = (certificate: CertificateType) => {
    setSelectedCertificate(certificate);
    setIsOpen(false);
  };

  return (
    <ThemeProvider theme={globalTheme}>
      <DropdownContainer>
        <DropdownButton onClick={toggleDropdown}>
          <Typography
            variant="h4"
            fontSize={{
              xs: "14px",
              sm: "28px",
            }}
            marginRight="8px"
          >
            {selectedCertificate.name}
          </Typography>
          {!isMd ? (
            <ArrowDownIcon width={28} height={28} />
          ) : (
            <ArrowDownIcon width={17} height={17} />
          )}
        </DropdownButton>
        {isOpen && (
          <DropdownList>
            {certificates.map(certificate => (
              <DropdownItem
                key={certificate.certificateId}
                isSelected={certificate.certificateId === selectedCertificate.certificateId}
                onClick={() => handleSelect(certificate)}
                variant="h4"
                fontSize={{
                  xs: "12px",
                  sm: "24px",
                }}
              >
                {certificate.name}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>
    </ThemeProvider>
  );
};

export default StatusBox;
