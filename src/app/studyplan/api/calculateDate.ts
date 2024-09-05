import { CalendarType } from "@/src/api/types/studyplan";
import { addDays, endOfMonth, format, startOfMonth } from "date-fns";
interface CalendarForDayType {
  day: string;
  fullDay: string;
  yoil: number;
  nowMonth: boolean;
  week: number;
  achive: number;
  disabled: boolean;
}
type weekType = {
  week: number;
  achive: number;
};
const getDatesOfMonth = (date: Date, createdAt: string, calendarDatas: CalendarType) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const startDate = new Date(createdAt);
  let dates = [];
  let weeks: weekType[] = [];
  for (let day = start; day <= end; day = addDays(day, 1)) {
    dates.push({
      day: format(day, "d"),
      fullDay: format(day, "yyyy-MM-dd"),
      yoil: day.getDay(),
      nowMonth: true,
      week: 0,
      achive: 0, // 기본값은 0로 그날에 하나도 안 풀었음을 의미한다.
      disabled: day < addDays(startDate, -1),
    });
  }
  if (dates[0].yoil !== 0) {
    let preMonthdates = [];
    let preYear = date.getFullYear();
    let preMonth = date.getMonth() - 1;
    if (preMonth == -1) {
      preYear--;
      preMonth = 11;
    }
    let preDate = new Date(preYear, preMonth);
    let preMonthStart = startOfMonth(preDate);
    let preMonthEnd = endOfMonth(preDate);
    for (let day = preMonthStart; day <= preMonthEnd; day = addDays(day, 1)) {
      preMonthdates.push({
        day: format(day, "d"),
        yoil: day.getDay(),
        fullDay: format(day, "yyyy-MM-dd"),
        nowMonth: false,
        week: 0,
        achive: 0,
        disabled: day < addDays(startDate, -1),
      });
    }
    let preMonthLength = preMonthdates.length;
    let preMonthStartIndex = preMonthLength - dates[0].yoil;
    for (let i = preMonthLength - 1; i >= preMonthStartIndex; i--) {
      dates.unshift(preMonthdates[i]);
    }
  }
  if (dates[dates.length - 1].yoil !== 6) {
    let nextMonthdates = [];
    let nextYear = date.getFullYear();
    let nextMonth = date.getMonth() + 1;
    if (nextMonth == 12) {
      nextYear++;
      nextMonth = 0;
    }
    let nextDate = new Date(nextYear, nextMonth);
    let nextMonthStart = startOfMonth(nextDate);
    let nextMonthEnd = endOfMonth(nextDate);
    for (let day = nextMonthStart; day <= nextMonthEnd; day = addDays(day, 1)) {
      nextMonthdates.push({
        day: format(day, "d"),
        yoil: day.getDay(),
        fullDay: format(day, "yyyy-MM-dd"),
        nowMonth: false,
        week: 0,
        achive: 0,
        disabled: day < addDays(startDate, -1),
      });
    }
    let nextMonthEndIndex = 6 - dates[dates.length - 1].yoil;
    for (let i = 0; i < nextMonthEndIndex; i++) {
      dates.push(nextMonthdates[i]);
    }
  }
  let week = 1;
  for (let i = 0; i < dates.length; i++) {
    dates[i].week = week;
    if (dates[i].yoil === 6) {
      week++;
    }
  }
  for (let i = 1; i <= dates[dates.length - 1].week; i++) {
    weeks.push({
      week: i,
      achive: 0,
    });
  }
  let returnDates: CalendarForDayType[][] = [[], [], [], [], [], [], []];

  dates.map(date => {
    returnDates[date.yoil].push(date);
  });
  dates.map(date => {
    let tem = calendarDatas.dailyProgress.find(t => t.day == date.fullDay);
    if (!tem) return;

    date.achive = Math.floor(
      (tem.planItems.reduce(
        (acc, cur) => (cur.completedValue! >= cur.targetValue ? 1 : 0) + acc,
        0
      ) /
        tem.planItems.length) *
        360
    );
  });

  weeks.map(week => {
    let tem = calendarDatas.weeklyProgress.find(t => t.week == week.week);
    if (!tem) return;
    week.achive = Math.floor(
      (tem.planItems.reduce(
        (acc, cur) => (cur.completedValue! >= cur.targetValue ? 1 : 0) + acc,
        0
      ) /
        tem.planItems.length) *
        360
    );
  });

  return {
    dates: returnDates,
    weeks,
  };
};

export default getDatesOfMonth;
