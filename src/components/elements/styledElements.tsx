import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";

export const NoHoverButton = styled(Button)({
  "&:hover": {
    backgroundColor: "inherit",
  },
});

export const MiddleBoxColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

export const MiddleBoxRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});
