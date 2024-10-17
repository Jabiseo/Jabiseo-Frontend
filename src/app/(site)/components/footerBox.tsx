import { Box, Typography, Button } from "@mui/material";

const FooterBox = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "var(--c-sub5)",
        height: {
          xs: "180px",
          md: "360px",
        },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "1165px",
          paddingX: {
            xs: "22px",
            md: "25px",
          },
          paddingY: {
            xs: "30px",
            md: "56px",
          },
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Typography
            variant="subtitle1"
            fontSize={{
              xs: "18px",
              md: "36px",
            }}
            color="white"
          >
            지금 자비서와 함께
          </Typography>
          <Typography
            variant="subtitle1"
            fontSize={{
              xs: "18px",
              md: "36px",
            }}
            color="white"
          >
            스마트한 자격증 취득을 시작하세요!
          </Typography>
        </Box>
        <Box>
          <Button
            disableTouchRipple
            disableFocusRipple
            sx={{
              backgroundColor: "var(--c-sub4)",
              padding: {
                xs: "14px 24px",
                md: "22px 48px",
              },
              borderRadius: "40px",
              "&:hover": {
                backgroundColor: "var(--c-sub4)",
              },
              transition: "none",
            }}
            href="/learning"
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "14px",
                  md: "24px",
                },
                color: "white",
              }}
            >
              공부 시작하기
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterBox;
