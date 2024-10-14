import { Box } from "@mui/material";
import { ReactNode } from "react";

const AnalysisMainTemplate = ({ children, top }: { children: ReactNode; top: boolean }) => {
  return (
    <Box
      sx={{
        marginTop: top ? "128px" : "0px",
        width: "100%",
        maxWidth: "1165px",
        paddingX: {
          xs: "22px",
          sm: "25px",
        },
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};
export default AnalysisMainTemplate;
