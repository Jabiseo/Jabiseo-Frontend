import { mainfetch } from "@/src/api/apis/mainFetch";
import { ActivePlanType, MakePlanType } from "@/src/api/types/studyplan";
import useMakePlanStates from "@/src/hooks/useMakePlanStates";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MakePlanCalendar from "../atom/makePlanCalendar";
import ChoiceDailyPlan from "../molecule/choiceDailyPlan";

const EditPlanTemplate = ({
  handlePlanType,
  activePlanData,
}: {
  handlePlanType: (type: "MAKE" | "EDIT" | "VIEW") => void;
  activePlanData: ActivePlanType;
}) => {
  const {
    daily,
    weekly,
    selectedDailyValue,
    selectedWeeklyValue,
    handleDailyCheck,
    handleWeeklyCheck,
    handleChangeValueDaily,
    handleChangeValueWeekly,
    initActivePlan,
  } = useMakePlanStates();
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    initActivePlan(activePlanData);
  }, []);
  const handleMakePlan = async () => {
    const makePlanData: MakePlanType = {
      endAt: endDate,
      dailyPlan: selectedDailyValue.map(v => {
        const tem = daily.find(d => d.activityType === v.activityType)!;
        return {
          targetValue: tem.targetValue,
          activityType: tem.activityType,
        };
      }),
      weeklyPlan: selectedWeeklyValue.map(v => {
        const tem = weekly.find(d => d.activityType === v.activityType)!;
        return {
          targetValue: tem.targetValue,
          activityType: tem.activityType,
        };
      }),
    };

    await mainfetch(
      `/plans/${activePlanData.planId}`,
      {
        method: "PUT",
        body: makePlanData,
      },
      true
    );
    handlePlanType("VIEW");
  };
  return (
    <Box
      sx={{
        width: "100%",
        paddingX: {
          xs: "25px",
          sm: "0px",
        },
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h1"
        fontSize={{
          xs: "16px",
          sm: "28px",
        }}
        marginBottom={{
          xs: "24px",
          sm: "36px",
        }}
      >
        학습 플랜 수정
      </Typography>
      <Box
        sx={{
          width: "100%",
          marginBottom: {
            xs: "28px",
            sm: "52px",
          },
        }}
      >
        <Typography
          variant="subtitle1"
          marginBottom={{
            xs: "12px",
            sm: "24px",
          }}
        >
          1. D-Day를 설정해주세요.
        </Typography>
        <MakePlanCalendar setEndDate={setEndDate} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: {
            xs: "57px",
            md: "106px",
          },
          marginBottom: {
            xs: "29px",
            sm: "84px",
          },
        }}
      >
        <ChoiceDailyPlan
          plans={daily}
          selectedValue={selectedDailyValue}
          handleCheck={handleDailyCheck}
          handleChangeValue={handleChangeValueDaily}
          description="일간 플랜 선택"
        />
        <ChoiceDailyPlan
          plans={weekly}
          selectedValue={selectedWeeklyValue}
          handleCheck={handleWeeklyCheck}
          handleChangeValue={handleChangeValueWeekly}
          description="주간 플랜 선택"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            md: "flex-end",
          },
          width: "100%",
        }}
      >
        <Button
          disableTouchRipple
          disabled={selectedDailyValue.length === 0 && selectedWeeklyValue.length === 0}
          sx={{
            padding: {
              xs: "14px 48px",
              md: "12px 32px",
            },
            backgroundColor:
              selectedDailyValue.length === 0 && selectedWeeklyValue.length === 0
                ? "var(--c-gray2)"
                : "var(--c-main)",
            borderRadius: {
              xs: "8px",
              md: "40px",
            },
            width: {
              xs: "100%",
              md: "auto",
            },
            "&:hover": {
              backgroundColor: "var(--c-main)",
            },
          }}
          onClick={handleMakePlan}
        >
          <Typography
            variant="h1"
            fontSize={{
              xs: "14px",
              sm: "18px",
            }}
            color="white"
          >
            플랜 수정
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default EditPlanTemplate;
