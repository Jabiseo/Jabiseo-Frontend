"use client";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";
import getDatesOfMonth from "../api/calculateDate";
import CalendarCircle from "../atom/calendarCircle";
import ArrowRightIcon from "@/public/icons/arrow-right-thick.svg";
import ArrowLeftIcon from "@/public/icons/arrow-left.svg";
import { ActivePlanType, CalendarType } from "@/src/api/types/studyplan";

interface CalendarForDayType {
  day: string;
  yoil: number;
  nowMonth: boolean;
  week: number;
  achive: number;
  fullDay: string;
  disabled: boolean;
}

interface WeekType {
  week: number;
  achive: number;
}

interface DatesType {
  dates: CalendarForDayType[][];
  weeks: WeekType[];
}

interface CalendarUIProps {
  handleViewDay: (day: string) => void;
  handleViewMonth: (date: Date) => void;
  handleViewWeek: (week: number) => void;
  activePlanData: ActivePlanType;
  planDatas: CalendarType;
}

const CalendarUI = memo(
  ({
    handleViewDay,
    handleViewMonth,
    handleViewWeek,
    activePlanData,
    planDatas,
  }: CalendarUIProps) => {
    const [dates, setDates] = useState<DatesType>();
    const [viewDate, setViewDate] = useState(new Date());
    let dayList = ["일", "월", "화", "수", "목", "금", "토"];

    useEffect(() => {
      const datesOfMonth = getDatesOfMonth(viewDate, activePlanData.createdAt, planDatas);
      setDates(datesOfMonth);
    }, [viewDate]);
    const handleViewDate = (goto: number) => {
      // 만약 goto가 -1 이면 전달로 이동, 1이면 다음달로 이동
      const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + goto);
      setViewDate(newDate);
      handleViewMonth(newDate);
    };
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));
    const isSm = useMediaQuery(theme.breakpoints.down("md"));
    return (
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingY: "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Box
            onClick={() => handleViewDate(-1)}
            sx={{
              cursor: "pointer",
            }}
          >
            <ArrowLeftIcon width={22} height={22} color={"var(--c-gray3)"} />
          </Box>
          <Typography variant="h1" fontSize={isXs ? "12px" : isSm ? "16px" : "24px"} marginX="24px">
            {viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
          </Typography>
          <Box
            onClick={() => handleViewDate(1)}
            sx={{
              cursor: "pointer",
            }}
          >
            <ArrowRightIcon width={22} height={22} color={"var(--c-gray3)"} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {dates?.dates.map((week, index) => {
            return (
              <Box
                sx={{
                  marginX: {
                    xs: "3px",
                    sm: "8px",
                    md: "12px",
                  },
                }}
                key={index}
              >
                <Box
                  sx={{
                    width: {
                      xs: "28px",
                      sm: "48px",
                      md: "64px",
                    },
                    height: {
                      xs: "28px",
                      sm: "48px",
                      md: "64px",
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    fontSize={isXs ? "12px" : isSm ? "16px" : "24px"}
                    color={index === 0 ? "red" : "black"}
                  >
                    {dayList[index]}
                  </Typography>
                </Box>
                {week.map(date => {
                  return (
                    <Box
                      sx={{
                        marginY: "14px",
                      }}
                      key={date.fullDay}
                    >
                      <CalendarCircle
                        data={date.day}
                        rotateRightDegree={Math.min(180, date.achive) + "deg"}
                        rotateLeftDegree={Math.max(date.achive - 180, 0) + "deg"}
                        fillBorderColor="var(--c-sub3)"
                        emptyBorderColor="var(--c-sub1)"
                        innerBackgroundColor={date.achive == 360 ? "var(--c-sub3)" : "#fff"}
                        disabled={!date.nowMonth || date.disabled}
                        isXs={isXs}
                        isSm={isSm}
                        handleViewDay={handleViewDay}
                        handleViewWeek={handleViewWeek}
                        fullDay={date.fullDay}
                        week={date.week}
                        achive={date.achive === 0}
                      />
                    </Box>
                  );
                })}
              </Box>
            );
          })}
          <Box
            sx={{
              borderLeft: "1px dotted var(--c-gray2)",
              paddingLeft: {
                xs: "6px",
                sm: "8px",
                md: "12px",
              },
              marginLeft: {
                xs: "6px",
                sm: "8px",
                md: "12px",
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "28px",
                  sm: "48px",
                  md: "64px",
                },
                height: {
                  xs: "28px",
                  sm: "48px",
                  md: "64px",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h1" fontSize={isXs ? "12px" : isSm ? "16px" : "24px"}>
                주간
              </Typography>
            </Box>
            {dates?.weeks.map((week, index) => {
              return (
                <Box
                  sx={{
                    marginY: "14px",
                  }}
                  key={week.week}
                >
                  <CalendarCircle
                    data={week.week + "주차"}
                    rotateRightDegree={Math.min(180, week.achive) + "deg"}
                    rotateLeftDegree={Math.max(week.achive - 180, 0) + "deg"}
                    fillBorderColor="var(--c-point)"
                    emptyBorderColor="var(--c-gray1)"
                    innerBackgroundColor={week.achive == 360 ? "var(--c-point)" : "#fff"}
                    isXs={isXs}
                    isSm={isSm}
                    handleViewWeek={week => {}}
                    achive={week.achive === -1}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  }
);

export default CalendarUI;
