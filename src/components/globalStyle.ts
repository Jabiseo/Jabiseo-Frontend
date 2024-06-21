import { createTheme } from "@mui/material";

export const globalTheme = createTheme({
  typography: {
    fontFamily: "Pretendard-Regular",
    h1: {
      fontSize: "56px",
      fontWeight: "bold",
      color: "var(--c-gray5)",
    },
    h2: {
      fontSize: "40px",
      fontWeight: "bold",
      color: "var(--c-gray5)",
    },
    h3: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "var(--c-gray5)",
    },
    body1: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "var(--c-gray5)",
    },
    body2: {
      fontSize: "20px",
      color: "var(--c-gray5)",
    },
    subtitle1: {
      fontSize: "16px",
      color: "var(--c-gray5)",
    },
  },
});
