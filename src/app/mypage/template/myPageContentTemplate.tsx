import { Box } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

const MyPageContentTemplate = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        maxWidth: "1165px",
        paddingX: "25px",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};

export default MyPageContentTemplate;
