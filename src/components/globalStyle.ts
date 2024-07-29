import { createTheme } from "@mui/material";

export const globalTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1140,
      xl: 1920,
    },
  },
  typography: {
    h1: {
      fontFamily: "Pretendard-Bold",
      fontWeight: 700,
      fontSize: "56px",
      color: "var(--c-gray5)",
    },
    h2: {
      fontFamily: "Pretendard-Bold",
      fontWeight: 700,
      fontSize: "40px",
      color: "var(--c-gray5)",
    },
    h3: {
      fontFamily: "Pretendard-Bold",
      fontWeight: 700,
      fontSize: "32px",
      color: "var(--c-gray5)",
    },
    h4: {
      fontFamily: "Pretendard-SemiBold",
      fontWeight: 600,
      fontSize: "40px",
      color: "var(--c-gray5)",
    },
    body1: {
      fontFamily: "Pretendard-Bold",
      fontWeight: 700,
      fontSize: "24px",
      color: "var(--c-gray5)",
    },
    body2: {
      fontFamily: "Pretendard-Regular",
      fontWeight: 400,
      fontSize: "20px",
      color: "var(--c-gray5)",
    },
    subtitle1: {
      fontFamily: "Pretendard-Medium",
      fontWeight: 500,
      fontSize: "16px",
      color: "var(--c-gray5)",
    },
  },
});
