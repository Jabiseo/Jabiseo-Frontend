import { Plan } from "@/src/api/types/studyplan";
import { Box, Button, Typography } from "@mui/material";
import ProgressBar from "../atom/progressBar";

interface PlanListItemProps {
  planItem: Plan;
  index: number;
}

const renderTypeDescription = (activityType: Plan["activityType"], targetValue: number) => {
  switch (activityType) {
    case "EXAM":
      return "시험 모드 " + targetValue + "회 풀기 ";
    case "STUDY":
      return "공부 모드 " + targetValue + "회 풀기 ";
    case "PROBLEM":
      return "문제 풀이 " + targetValue + "개 풀기 ";
    case "TIME":
      return "공부 " + targetValue + "시간 하기";
  }
};

const PlanListItem: React.FC<PlanListItemProps> = ({ planItem, index }) => {
  const progress = Math.min(
    100,
    Math.floor((planItem.completedValue! / planItem.targetValue) * 100)
  );
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: {
          xs: "flex-start",
          md: "center",
        },
        padding: {
          xs: "20px 22px",
          md: "24px 36px",
        },
        width: "100%",
        justifyContent: {
          xs: "flex-start",
          md: "space-between",
        },
        boxSizing: "border-box",
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      <Typography
        variant="h4"
        fontSize={{
          xs: "14px",
          sm: "20px",
        }}
      >
        {index}. {renderTypeDescription(planItem.activityType, planItem.targetValue)} (
        {planItem.completedValue}/{planItem.targetValue})
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: {
            xs: "20px",
            md: "0px",
          },
          width: {
            xs: "100%",
            md: "auto",
          },
          justifyContent: {
            xs: "space-between",
            md: "flex-end",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              alignItems: {
                xs: "flex-start",
                md: "center",
              },
            }}
          >
            <ProgressBar progress={progress} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: {
                  xs: "8px",
                  md: "0px",
                },
              }}
            >
              <Typography
                variant="h4"
                fontSize={{
                  xs: "14px",
                  sm: "20px",
                }}
                marginLeft={{
                  xs: "0px",
                  md: "24px",
                }}
              >
                현재 진행율&nbsp;
              </Typography>
              <Typography
                variant="h4"
                fontSize={{
                  xs: "14px",
                  sm: "20px",
                }}
                color="var(--c-main)"
                minWidth="51px"
              >
                {progress}%
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "1px",
              height: "27px",
              backgroundColor: "var(--c-gray2)",
              marginX: {
                xs: "16px",
                md: "24px",
              },
            }}
          />
        </Box>
        <Button
          disableTouchRipple
          disabled={progress == 100}
          sx={{
            "&:hover": {
              backgroundColor: progress !== 100 ? "var(--c-main)" : "var(--c-gray2)",
              cursor: progress == 100 ? "default" : "pointer",
            },
            backgroundColor: progress !== 100 ? "var(--c-main)" : "var(--c-gray2)",
            borderRadius: "40px",
            padding: "8px 18px",
          }}
          href="/learning"
        >
          <Typography
            variant="h4"
            fontSize={{
              xs: "12px",
              sm: "16px",
            }}
            color="white"
          >
            문제 풀러 가기
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default PlanListItem;
