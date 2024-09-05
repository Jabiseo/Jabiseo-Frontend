import {
  ActivePlanType,
  CalendarType,
  Plan,
  templan,
  ViewPlanType,
} from "@/src/api/types/studyplan";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CalendarUI from "../molecule/calendarUI";
import PlanList from "../molecule/planList";
import { useEffect, useState } from "react";
import { mainfetch } from "@/src/api/apis/mainFetch";
import { differenceInDays, format, formatDistance, subDays } from "date-fns";
import getDatesOfMonth from "../api/calculateDate";

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
  const tem = templan;
  // 보고있는 연도와 달을 저장하는 state
  const [viewMonth, setViewMonth] = useState(new Date());
  // 보고있는 날짜를 저장하는 state
  const [viewDay, setViewDay] = useState(format(new Date(), "yyyy-MM-dd"));
  const [viewWeek, setViewWeek] = useState(1);
  const [planDatas, setPlanDatas] = useState<CalendarType>(templan);
  const [dailyProgress, setDailyProgress] = useState<Plan[]>();
  const [weeklyProgress, setWeeklyProgress] = useState<Plan[]>();

  useEffect(() => {
    const getDailyProgress = tem.dailyProgress.find(item => item.day === viewDay);
    setDailyProgress(getDailyProgress!.planItems);
  }, [viewDay]);

  useEffect(() => {
    const getWeeklyProgress = tem.weeklyProgress.find(item => item.week === viewWeek);
    setWeeklyProgress(getWeeklyProgress!.planItems);
  }, [viewWeek]);

  const handleViewDay = (day: string) => {
    setViewDay(day);
  };

  const handleViewMonth = (date: Date) => {
    setViewMonth(date);
  };

  const handleViewWeek = (week: number) => {
    setViewWeek(week);
  };

  // useEffect(() => {
  //   const getPlansForMonth = async () => {
  //     const res = await mainfetch(
  //       `/plans/${activePlanData.planId}/calender?
  //       year=${viewMonth.getFullYear()}&month=${viewMonth.getMonth() + 1}`,
  //       {
  //         method: "GET",
  //       },
  //       true
  //     );

  //     if (!res.ok) {
  //       throw new Error("Failed to fetch plans");
  //     }
  //     const data = await res.json();
  //     setPlanDatas(data);
  //   };
  //   getPlansForMonth();
  // },[viewMonth]);
  if (
    !dailyProgress ||
    !weeklyProgress ||
    dailyProgress.length === 0 ||
    weeklyProgress.length === 0
  ) {
    return <div>loading...</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
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
          marginLeft={{
            xs: "25px",
            sm: "0px",
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
    </Box>
  );
};
export default ViewPlanTemplate;
