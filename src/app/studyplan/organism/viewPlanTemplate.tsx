import { mainfetch } from "@/src/api/apis/mainFetch";
import { ActivePlanType, CalendarType, Plan } from "@/src/api/types/studyplan";
import { Box, Typography } from "@mui/material";
import { differenceInDays, format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import CalendarUI from "../molecule/calendarUI";
import PlanList from "../molecule/planList";
import { getWeek } from "date-fns/getWeek";
import { startOfMonth } from "date-fns/startOfMonth";

function formatDayDate(dateString: string) {
  // 날짜 문자열을 '-' 기준으로 분리
  const parts = dateString.split("-");

  // 분리된 부분을 원하는 형식으로 결합
  return `${parseInt(parts[0])}. ${parseInt(parts[1])}. ${parseInt(parts[2])} 일간`;
}

const ViewPlanTemplate = ({
  handlePlanType,
  activePlanData,
}: {
  handlePlanType: (type: "MAKE" | "EDIT" | "VIEW") => void;
  activePlanData: ActivePlanType;
}) => {
  // 보고있는 연도와 달을 저장하는 state
  const [viewMonth, setViewMonth] = useState(new Date());
  // 보고있는 날짜를 저장하는 state
  const [viewDay, setViewDay] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [viewWeek, setViewWeek] = useState<number>(() => {
    const currentDate = new Date();
    return (
      getWeek(currentDate, { weekStartsOn: 1 }) -
      getWeek(startOfMonth(currentDate), { weekStartsOn: 1 }) +
      1
    );
  });
  const [planDatas, setPlanDatas] = useState<CalendarType | undefined>();
  const [dailyProgress, setDailyProgress] = useState<Plan[]>();
  const [weeklyProgress, setWeeklyProgress] = useState<Plan[]>();

  useEffect(() => {
    if (!planDatas) return;
    const getDailyProgress = planDatas.dailyProgress.find(item => item.day === viewDay);
    if (getDailyProgress) {
      getDailyProgress.planItems.map(plan => {
        if (plan.activityType === "TIME") {
          plan.completedValue = Math.floor(plan.completedValue! / 60);
          plan.targetValue = Math.floor(plan.targetValue! / 60);
        }
      });
    }
    setDailyProgress(getDailyProgress ? getDailyProgress.planItems : []);
  }, [viewDay, planDatas]);

  useEffect(() => {
    if (!planDatas) return;
    const getWeeklyProgress = planDatas.weeklyProgress.find(item => item.week === viewWeek);
    if (getWeeklyProgress) {
      getWeeklyProgress.planItems.map(plan => {
        if (plan.activityType === "TIME") {
          plan.completedValue = Math.floor(plan.completedValue! / 60);
          plan.targetValue = Math.floor(plan.targetValue! / 60);
        }
      });
    }
    setWeeklyProgress(getWeeklyProgress ? getWeeklyProgress.planItems : []);
  }, [viewWeek, planDatas]);

  const handleViewDay = useCallback((day: string) => {
    setViewDay(day);
  }, []);

  const handleViewMonth = useCallback((date: Date) => {
    setViewMonth(date);
  }, []);

  const handleViewWeek = useCallback((week: number) => {
    setViewWeek(week);
  }, []);

  const handleDeletePlan = async () => {
    const res = await mainfetch(
      `/plans/${activePlanData.planId}`,
      {
        method: "DELETE",
      },
      true
    );
    if (!res.ok) {
      alert("플랜 삭제 실패");
      return;
    }

    window.location.reload();
  };

  useEffect(() => {
    const getPlansForMonth = async () => {
      const res = await mainfetch(
        `/plans/${activePlanData.planId}/calender?year=${viewMonth.getFullYear()}&month=${
          viewMonth.getMonth() + 1
        }`,
        {
          method: "GET",
        },
        true
      );

      if (!res.ok) {
        alert("먼저 마이페이지에서 자격증을 설정해주세요.");
        window.location.href = "/";
        return;
      }
      const data = await res.json();

      setPlanDatas(data);
    };
    getPlansForMonth();
  }, [viewMonth]);

  if (!planDatas || !dailyProgress || !weeklyProgress) {
    return <div>loading...</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          paddingX: {
            xs: "25px",
            sm: "0px",
          },
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            marginBottom: {
              sm: "100px",
            },
            display: {
              xs: "none",
              md: "flex",
            },
            justifyContent: "center",
            alignItems: "center",
            padding: "28px 44px",
            borderRadius: "12px",
            border: "1px solid var(--c-sub3)",
            boxSizing: "border-box",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h1" fontSize="28px">
            시험일까지&nbsp;
          </Typography>
          <Typography variant="h1" fontSize="28px" color="var(--c-sub3)">
            {differenceInDays(new Date(activePlanData.endAt), new Date()) + 1}일&nbsp;
          </Typography>
          <Typography variant="h1" fontSize="28px">
            남았습니다!
          </Typography>
        </Box>
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
          textAlign="left"
        >
          학습 플랜 현황
        </Typography>
        <CalendarUI
          handleViewDay={handleViewDay}
          handleViewMonth={handleViewMonth}
          handleViewWeek={handleViewWeek}
          activePlanData={activePlanData}
          planDatas={planDatas}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <PlanList
          planItems={dailyProgress}
          text={formatDayDate(viewDay)}
          handlePlanType={handlePlanType}
        />
        <PlanList
          planItems={weeklyProgress}
          text={
            viewMonth.getFullYear() +
            ". " +
            (viewMonth.getMonth() + 1) +
            ". " +
            viewWeek +
            "주차 주간"
          }
          handlePlanType={handlePlanType}
        />
      </Box>
      <Typography
        variant="subtitle1"
        mt={{
          xs: "20px",
          sm: "30px",
        }}
        fontSize={{
          xs: "12px",
          sm: "16px",
        }}
        sx={{
          textDecoration: "underline",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        ml={{
          xs: "25px",
          sm: "0px",
        }}
        color="var(--c-red)"
        onClick={handleDeletePlan}
      >
        플랜 삭제
      </Typography>
    </Box>
  );
};
export default ViewPlanTemplate;
