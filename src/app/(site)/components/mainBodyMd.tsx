import { Box, Typography } from "@mui/material";
import Image from "next/image";
const MainBodyMd = () => {
  return (
    <Box
      sx={{
        display: {
          xs: "none",
          md: "flex",
        },
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "48px",
          marginBottom: "80px",
        }}
      >
        <Image src="/mainImage1.webp" alt="image" width={400} height={330} />
        <Box>
          <Typography
            variant="h1"
            fontSize={"32px"}
            sx={{
              marginBottom: "32px",
            }}
          >
            기출 문제와 그에 맞는
            <br />
            AI 해설 서비스
          </Typography>
          <Typography variant="body2" fontSize={"24px"} color="var(--c-gray4)">
            기출문제 풀이와 이론 학습을 AI 기술로 <br />
            디지털화하여 최적화된 학습을 해보세요!
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "48px",
          marginBottom: "80px",
        }}
      >
        <Box>
          <Typography
            variant="h1"
            fontSize={"32px"}
            sx={{
              marginBottom: "32px",
            }}
          >
            개인화 된 <br />
            학습 플랜 제공
          </Typography>
          <Typography variant="body2" fontSize={"24px"} color="var(--c-gray4)">
            시험 날짜에 맞춰 일간/주간 목표를 <br />
            설정하고 체계적인 관리를 해보세요!
          </Typography>
        </Box>
        <Image src="/mainImage2.webp" alt="image" width={400} height={330} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "48px",
          marginBottom: "170px",
        }}
      >
        <Image src="/mainImage3.webp" alt="image" width={400} height={330} />
        <Box>
          <Typography
            variant="h1"
            fontSize={"32px"}
            sx={{
              marginBottom: "32px",
            }}
          >
            학습 비서를 이용한 <br />
            데이터 기반 맞춤 학습 분석
          </Typography>
          <Typography variant="body2" fontSize={"24px"} color="var(--c-gray4)">
            사용자 문제 풀이 기록을 바탕으로 <br />
            취약점 분석을 하고, 취약한 문제/과목 등을
            <br />
            추천받아보세요! 나만을 위한 추천 모의고사까지!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MainBodyMd;
