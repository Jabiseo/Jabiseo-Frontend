import { Box, SelectChangeEvent, Typography } from "@mui/material";
import EditCertificate from "../atom/editCertificate";

interface CertificateMoleculeProps {
  isEdit: boolean;
  certificates: CertificateType[];
  setMyCertificate: (exam: string) => void;
  certificate: string;
}
const CertificateMolecule = ({
  isEdit,
  certificates,
  certificate,
  setMyCertificate,
}: CertificateMoleculeProps) => {
  const handleCertificateChange = (certificate: string) => {
    setMyCertificate(certificate);
  };
  return (
    <Box
      sx={{
        marginBottom: "24px",
        width: "100%",
      }}
    >
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
          자격증 상태
        </Typography>
      </Box>
      <Box marginTop="36px">
        <Typography variant="h1" fontSize={{ xs: "16px", sm: "20px" }}>
          공부 진행 중인 자격증
        </Typography>
        <EditCertificate
          certificates={certificates}
          handleInitialCertificateChange={handleCertificateChange}
          initialCertificate={certificate}
          isEdit={isEdit}
        />
      </Box>
    </Box>
  );
};
export default CertificateMolecule;
