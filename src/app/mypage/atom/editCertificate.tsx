import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import ArrowDownIcon from "@/public/icons/arrow-down.svg";
import ArrowUpIcon from "@/public/icons/arrow-up.svg";
import { useEffect, useState } from "react";
import SaveButton from "./saveButton";
import { mainfetch } from "@/src/api/apis/mainFetch";

interface EditCertificateProps {
  certificates: CertificateType[];
  handleInitialCertificateChange: (certificate: string) => void;
  initialCertificate: string;
  isEdit: boolean;
}

const EditCertificate: React.FC<EditCertificateProps> = ({
  certificates,
  handleInitialCertificateChange,
  initialCertificate,
  isEdit,
}) => {
  const [open, setOpen] = useState(false);
  const [certificate, setCertificate] = useState(initialCertificate);

  useEffect(() => {
    setCertificate(initialCertificate);
  }, [initialCertificate]);

  const handleCertificateChange = (event: SelectChangeEvent) => {
    setCertificate(event.target.value as string);
  };
  const handleCancel = () => {
    setCertificate(initialCertificate);
  };
  const handleSave = () => {
    const fetchCertificate = async () => {
      if (certificate === initialCertificate) {
        return;
      }
      const certificateId = certificates.find(cert => cert.name === certificate)?.certificateId;
      const response = await mainfetch(
        "/members/myinfo/certificates",
        {
          method: "PATCH",
          body: {
            certificateId: certificateId,
          },
        },
        true
      );
      if (!response.ok) {
        alert("자격증 변경에 실패했습니다.");
        return;
      }
      handleInitialCertificateChange(certificate);
    };

    fetchCertificate();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        width: "100%",
        paddingY: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <FormControl
        disabled={!isEdit}
        sx={{
          width: {
            xs: "80%",
            sm: "50%",
          },
          backgroundColor: isEdit ? "white" : "inherit",
          borderRadius: "8px",
          border: isEdit ? "1px solid var(--c-gray2)" : "none",
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
          },
        }}
      >
        <Select
          displayEmpty
          renderValue={selected => {
            if (selected.length === 0) {
              return (
                <Typography variant="body2" fontSize="18px">
                  자격증을 선택해주세요.
                </Typography>
              );
            }
            return (
              <Typography variant="body2" fontSize="18px">
                {selected}
              </Typography>
            );
          }}
          value={certificate}
          onChange={handleCertificateChange}
          IconComponent={() => {
            if (!isEdit) {
              return null;
            }
            return open ? (
              <Box marginRight="10px">
                <ArrowUpIcon width={20} height={20} />
              </Box>
            ) : (
              <Box marginRight="10px">
                <ArrowDownIcon width={20} height={20} />
              </Box>
            );
          }}
          onOpen={handleOpen}
          onClose={handleClose}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 224,
                overflowY: "auto",
                padding: "0px 4px",
                boxSizing: "border-box",
              },
            },
          }}
          sx={{
            "& .MuiInputBase-input": {
              boxSizing: "border-box",
              padding: "0px 5px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiSelect-select": {
              padding: "11px 20px",
            },
            "& .MuiMenu-list": {
              padding: 0,
            },
          }}
        >
          {certificates.map((cert, index) => (
            <MenuItem
              key={cert.certificateId}
              value={cert.name}
              sx={{
                padding: "11px 20px",
                "&.Mui-selected": {
                  backgroundColor: "#44bbd429 !important",
                  color: "#44bbd429",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#44bbd429",
                },
                "&:hover": {
                  backgroundColor: cert.name == certificate ? "#44bbd429" : "var(--c-gray1)",
                },
              }}
            >
              <Typography
                variant="body2"
                fontSize={"18px"}
                color={cert.name == certificate && open ? "var(--c-sub3)" : ""}
              >
                {cert.name}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {isEdit && <SaveButton handleSave={handleSave} handleCancel={handleCancel} />}
    </Box>
  );
};
export default EditCertificate;
