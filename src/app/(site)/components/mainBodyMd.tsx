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
        <Image src="/tempImage.png" alt="image" width={400} height={330} />
        <Box>
          <Typography
            variant="h1"
            fontSize={"32px"}
            sx={{
              marginBottom: "32px",
            }}
          >
            기출문제 및 AI 해설
          </Typography>
          <Typography variant="body2" fontSize={"24px"} color="var(--c-gray4)">
            기출문제 풀이와 이론 학습을 AI 기술로 디지털화하여, 수험생에게 최적의 학습 콘텐츠를
            제공합니다.
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
            학습 비서 : 학습 플랜
          </Typography>
          <Typography variant="body2" fontSize={"24px"} color="var(--c-gray4)">
            사용자가 원하는 대로 플랜을 지정하고 학습에 도움을 받을 수 있습니다.
          </Typography>
        </Box>
        <Image src="/tempImage.png" alt="image" width={400} height={330} />
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
        <Image src="/tempImage.png" alt="image" width={400} height={330} />
        <Box>
          <Typography
            variant="h1"
            fontSize={"32px"}
            sx={{
              marginBottom: "32px",
            }}
          >
            학습 비서 : 맞춤 학습 분석
          </Typography>
          <Typography variant="body2" fontSize={"24px"} color="var(--c-gray4)">
            디지털 기술과 AI를 활용하여 수험생의 취약점을 분석해 최적화된 학습 솔루션을 제공합니다.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MainBodyMd;
