import { globalTheme } from "@/src/components/globalStyle";
import useCertificates from "@/src/hooks/useCertificates";
import { ThemeProvider } from "@emotion/react";
import { Box, Grid, Typography } from "@mui/material";

interface CertificateProps {
  handleIsCertificate: () => void;
}

const SelectCertificateUI: React.FC<CertificateProps> = ({ handleIsCertificate }) => {
  const { certificates, loading, error } = useCertificates();

  const selectCertificate = (certificate: CertificateType) => {
    localStorage.setItem("certificate", JSON.stringify(certificate));
    handleIsCertificate();
  };

  return (
    <>
      <ThemeProvider theme={globalTheme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box>
            <Typography
              variant="h1"
              fontSize={{
                xs: "26px",
                sm: "32px",
              }}
            >
              자격증을 먼저 선택해주세요!
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {certificates.map(certificate => (
              <Grid item xs={6} md={4} lg={3} key={certificate.certificateId}>
                <Box
                  onClick={() => selectCertificate(certificate)}
                  sx={{
                    minHeight: "80px",
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
                      xs: "16px",
                      sm: "20px",
                    }}
                  >
                    {certificate.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SelectCertificateUI;
