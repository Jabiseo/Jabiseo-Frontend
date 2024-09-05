import { useState } from "react";
import { ActivePlanType, Plan } from "../api/types/studyplan";
import { dailyPlan, weeklyPlan } from "../app/studyplan/api/planList";

const useMakePlanStates = () => {
  const [daily, setDaily] = useState<Plan[]>(dailyPlan);
  const [weekly, setWeekly] = useState<Plan[]>(weeklyPlan);
  const [selectedDailyValue, setSelectedDailyValue] = useState<Plan[]>([]);
  const [selectedWeeklyValue, setSelectedWeeklyValue] = useState<Plan[]>([]);
  const handleDailyCheck = (e: any) => {
    if (selectedDailyValue.some(v => v.activityType === e.target.value)) {
      setSelectedDailyValue(selectedDailyValue.filter(v => v.activityType !== e.target.value));
    } else {
      setSelectedDailyValue([
        ...selectedDailyValue,
        daily.find(v => v.activityType === e.target.value)!,
      ]);
    }
  };
  const handleWeeklyCheck = (e: any) => {
    if (selectedWeeklyValue.some(v => v.activityType === e.target.value)) {
      setSelectedWeeklyValue(selectedWeeklyValue.filter(v => v.activityType !== e.target.value));
    } else {
      setSelectedWeeklyValue([
        ...selectedWeeklyValue,
        weekly.find(v => v.activityType === e.target.value)!,
      ]);
    }
  };
  const handleChangeValueDaily = (e: React.ChangeEvent<HTMLInputElement>, v: Plan) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    if (e.target.value.trim() === "") {
      const newDaily = daily.map(plan => {
        if (plan.activityType === v.activityType) {
          return {
            ...plan,
            targetValue: 0,
          };
        }
        return plan;
      });
      setDaily(newDaily);
      return;
    }
    const value = parseInt(e.target.value);
    if (value <= 0) {
      alert("1 이상의 숫자만 입력해주세요.");
      return;
    }
    const newDaily = daily.map(plan => {
      if (plan.activityType === v.activityType) {
        return {
          ...plan,
          targetValue: value,
        };
      }
      return plan;
    });
    setDaily(newDaily);
  };
  const handleChangeValueWeekly = (e: React.ChangeEvent<HTMLInputElement>, v: Plan) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    if (e.target.value.trim() === "") {
      const newWeekly = weekly.map(plan => {
        if (plan.activityType === v.activityType) {
          return {
            ...plan,
            targetValue: 0,
          };
        }
        return plan;
      });
      setWeekly(newWeekly);
      return;
    }
    const value = parseInt(e.target.value);
    if (value <= 0) {
      alert("1 이상의 숫자만 입력해주세요.");
      return;
    }
    const newWeekly = weekly.map(plan => {
      if (plan.activityType === v.activityType) {
        return {
          ...plan,
          targetValue: value,
        };
      }
      return plan;
    });
    setWeekly(newWeekly);
  };

  const initActivePlan = (activePlan: ActivePlanType) => {
    const dailyPlan = activePlan.dailyPlanItems.map(v => {
      const tem = daily.find(d => d.activityType === v.activityType)!;
      return {
        targetValue: v.targetValue,
        activityType: tem.activityType,
      };
    });
    const weeklyPlan = activePlan.weeklyPlanItems.map(v => {
      const tem = weekly.find(d => d.activityType === v.activityType)!;
      return {
        targetValue: v.targetValue,
        activityType: tem.activityType,
      };
    });
    setSelectedDailyValue(dailyPlan);
    setSelectedWeeklyValue(weeklyPlan);
    daily.forEach((v, i) => {
      daily[i].targetValue =
        dailyPlan.find(d => d.activityType === v.activityType)?.targetValue || 0;
    });
    weekly.forEach((v, i) => {
      weekly[i].targetValue =
        weeklyPlan.find(d => d.activityType === v.activityType)?.targetValue || 0;
    });
  };
  return {
    daily,
    weekly,
    selectedDailyValue,
    selectedWeeklyValue,
    handleDailyCheck,
    handleWeeklyCheck,
    handleChangeValueDaily,
    handleChangeValueWeekly,
    initActivePlan,
  };
};
export default useMakePlanStates;
