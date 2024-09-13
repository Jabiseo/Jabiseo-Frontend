import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface CertificateSelectProps {
  certificates: CertificateType[];
  handleCertificateSelect: (event: SelectChangeEvent) => void;
  selectedCertificate: CertificateType;
}

const CertificateSelect = ({
  certificates,
  handleCertificateSelect,
  selectedCertificate,
}: CertificateSelectProps) => {
  // 자격증 선택 박스 너비 조절
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState<number | null>(null);

  useEffect(() => {
    if (boxRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          setBoxWidth(entry.contentRect.width);
        }
      });
      resizeObserver.observe(boxRef.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <Box
      ref={boxRef}
      sx={{
        width: {
          xs: "60%",
          sm: "40%",
          md: "30%",
        },
        backgroundColor: "white",
        borderRadius: "40px",
        padding: {
          xs: "8px 12px",
          md: "16px 24px",
        },
        border: "1px solid var(--c-gray2)",
        boxSizing: "border-box",
        alignSelf: {
          xs: "start",
          md: "center",
        },
        marginBottom: {
          xs: "20px",
          md: "0",
        },
      }}
    >
      <FormControl
        sx={{
          width: "100%",
          padding: "0",
        }}
      >
        <Select
          value={selectedCertificate?.name}
          onChange={handleCertificateSelect}
          fullWidth
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 224,
                overflowY: "auto",
                width: {
                  xs: boxWidth ? `${boxWidth + 24}px` : "23%",
                  md: boxWidth ? `${boxWidth + 48}px` : "23%",
                },
                borderRadius: "12px",
              },
            },
          }}
          sx={{
            "& .MuiInputBase-input": {
              boxSizing: "border-box",
              padding: "0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          {certificates.map((certificate, index) => (
            <MenuItem
              key={certificate.certificateId}
              value={certificate.name}
              sx={{
                "&.Mui-selected": {
                  "&.Mui-focusVisible": { background: "#44bbd429" },
                  backgroundColor: "#44bbd429",
                  color: "#44bbd429",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#44bbd429",
                },
                "&:hover": {
                  backgroundColor:
                    certificate.name == selectedCertificate?.name ? "#44bbd429" : "var(--c-gray1)",
                },
                padding: {
                  xs: "8px 12px",
                  md: "16px 24px",
                },
              }}
            >
              <Typography
                variant="body2"
                fontSize={{
                  xs: "14px",
                  md: "18px",
                }}
                color={certificate.name == selectedCertificate?.name ? "var(--c-sub3)" : ""}
                sx={{
                  width: "100%",
                }}
              >
                {certificate.name}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default CertificateSelect;
