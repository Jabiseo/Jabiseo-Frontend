import FaceBookIcon from "@/public/icons/facebook-line.svg";
import InstagramIcon from "@/public/icons/instagram-line.svg";
import { ThemeProvider } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { MiddleBoxColumn } from "./elements/styledElements";
import { globalTheme } from "./globalStyle";

const Footer = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <MiddleBoxColumn
        sx={{
          mt: {
            xs: "40px",
            lg: "60px",
          },
          minHeight: "260px",
          width: "100%",
          borderTop: "1px solid var(--c-gray2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            width: "100%",
            maxWidth: "1165px",
            paddingX: "25px",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              color="var(--c-gray4)"
              fontSize={{
                xs: "16px",
                sm: "24px",
              }}
            >
              자비서
            </Typography>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
                gap: "8px",
              }}
            >
              <FaceBookIcon width={24} height={24} />
              <InstagramIcon width={24} height={24} />
            </Box>
            <Box
              sx={{
                display: {
                  xs: "flex",
                  sm: "none",
                },
                gap: "8px",
              }}
            >
              <FaceBookIcon width={20} height={20} />
              <InstagramIcon width={20} height={20} />
            </Box>
          </Box>
          <Box mt={2}>
            <Typography
              color="var(--c-gray4)"
              fontSize={{
                xs: "10px",
                sm: "14px",
              }}
            >
              이용약관 | 개인정보처리방침
            </Typography>
          </Box>
          <Box mt={1.5}>
            <Typography
              color="var(--c-gray4)"
              fontSize={{
                xs: "10px",
                sm: "14px",
              }}
            >
              SW 마에스트로 15기 | 대표 장우석 | 이메일 주소: jabiseo@gmail.com | Copyright @ 2024
              jabiseo All right reserved.
            </Typography>
          </Box>
          <Box>
            <Typography
              color="var(--c-gray4)"
              fontSize={{
                xs: "10px",
                sm: "14px",
              }}
            >
              주소: 서울특별시 강남구 테헤란로 311 아남타워빌딩 7층 | 우편번호 06584
            </Typography>
          </Box>
        </Box>
      </MiddleBoxColumn>
    </ThemeProvider>
  );
};

export default Footer;
