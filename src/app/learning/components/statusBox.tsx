"use client";

import { mainfetch } from "@/src/api/apis/mainFetch";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

const StatusBox = () => {
  const [status, setStatus] = useState("");
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  /**
   * @todo 자격증 목록을 가져오는 함수
   */
  const getCertificates = async () => {
    const response = await mainfetch("/certificate", { method: "GET" }, false)
      .then(res => res.json())
      .catch();
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  return (
    <>
      <Select
        value={status}
        onChange={handleStatusChange}
        displayEmpty
        sx={{
          minWidth: 300,
          marginBottom: 4,
          borderRadius: 2,
          "&.MuiOutlinedInput-root": {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--c-light-brown)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--c-light-brown)",
            },
          },
        }}
      >
        <MenuItem value="">자격증을 골라주세요.</MenuItem>
        <MenuItem value={1}>정보처리기사</MenuItem>
        <MenuItem value={2}>정보처리 기능사</MenuItem>
        <MenuItem value={3}>전기 기사</MenuItem>
      </Select>
    </>
  );
};

export default StatusBox;
