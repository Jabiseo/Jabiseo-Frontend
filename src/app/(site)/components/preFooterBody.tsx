// pages/index.js
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

export default function PreFooterBody() {
  const features = [
    {
      title: "기출문제 풀이",
      description: "공부 모드와 시험 모드를 통해 실제 CBT 환경과 유사한 문제 풀이 경험 제공",
      icon: "📂", // 여기에 실제 아이콘을 넣으세요.
    },
    {
      title: "맞춤형 학습 플랜",
      description: "사용자의 일정과 학습 진도에 맞는 개인화된 학습 계획 수립 및 알림 제공",
      icon: "📊",
    },
    {
      title: "학습 분석 및 추천",
      description: "사용자의 문제 풀이 데이터를 기반으로 취약점 분석 및 맞춤형 문제 추천",
      icon: "📈",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#E8F5F8", minHeight: "50vh", py: 5 }}>
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        자비서가 제공하는 기능이에요!
      </Typography>
      <Typography variant="subtitle1" textAlign="center" sx={{ mb: 4, color: "#666" }}>
        초개인화 된 자격증 CBT 학습 비서를 이용해보세요!
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{
          paddingX: {
            xs: 2,
            sm: 4,
          },
        }}
      >
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                p: 3,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    fontSize: "48px",
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: "#2C3E50",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#7F8C8D",
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
