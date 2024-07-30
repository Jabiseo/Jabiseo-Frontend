import { MiddleBoxColumn } from "@/src/components/elements/styledElements";
import { globalTheme } from "@/src/components/globalStyle";
import useCertificates from "@/src/hooks/useCertificates";
import { ThemeProvider } from "@emotion/react";
import { Box, Typography } from "@mui/material";

interface CertificateProps {
  handleIsCertificate: () => void;
}

const SelectCertificateUI: React.FC<CertificateProps> = ({ handleIsCertificate }) => {
  const { certificates, loading, error } = useCertificates();

  const selectCertificate = (certificate: CertificateType) => {
    localStorage.setItem("certificate", JSON.stringify(certificate));
    handleIsCertificate();
  };

  const emptyBox = [1, 2, 3, 4];

  return (
    <>
      <ThemeProvider theme={globalTheme}>
        <MiddleBoxColumn
          sx={{
            marginBottom: "260px",
            maxWidth: "1165px",
            width: "100%",
            paddingX: "25px",
            boxSizing: "border-box",
          }}
        >
          <MiddleBoxColumn
            mt={{
              xs: "50px",
              md: "110px",
            }}
          >
            <Box>
              <Typography
                variant="h1"
                fontSize={{
                  xs: "16px",
                  sm: "32px",
                }}
              >
                자격증을 먼저 선택해주세요!
              </Typography>
            </Box>
            <MiddleBoxColumn>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: {
                    xs: "50px",
                    lg: "100px",
                  },
                }}
              >
                {certificates.map(certificate => (
                  <Box
                    key={certificate.certificateId}
                    onClick={() => selectCertificate(certificate)}
                    sx={{
                      height: {
                        xs: "57px",
                        lg: "80px",
                      },
                      width: {
                        xs: "157px",
                        lg: "260px",
                      },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid var(--c-gray2)",
                      borderRadius: "12px",
                      margin: "10px",
                      cursor: "pointer",
                      boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        borderColor: "var(--c-sub3)",
                      },
                      backgroundColor: "white",
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontSize={{
                        xs: "14px",
                        sm: "20px",
                      }}
                    >
                      {certificate.name}
                    </Typography>
                  </Box>
                ))}
                {emptyBox.map(_ => (
                  <Box
                    key={_}
                    sx={{
                      height: {
                        xs: "57px",
                        md: "80px",
                      },
                      width: {
                        xs: "157px",
                        md: "260px",
                      },
                      visibility: "hidden",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid var(--c-gray2)",
                      borderRadius: "12px",
                      margin: "10px",
                      cursor: "pointer",
                      boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.1)",
                      backgroundColor: "white",
                    }}
                  ></Box>
                ))}
              </Box>
            </MiddleBoxColumn>
          </MiddleBoxColumn>
        </MiddleBoxColumn>
      </ThemeProvider>
    </>
  );
};

export default SelectCertificateUI;
