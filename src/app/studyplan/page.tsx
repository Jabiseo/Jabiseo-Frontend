"use client";
import Appbar from "@/src/components/Appbar";
import { MiddleBoxColumn } from "@/src/components/elements/styledElements";
import Footer from "@/src/components/Footer";
import { globalTheme } from "@/src/components/globalStyle";
import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import UserPlanInfo from "./atom/userPlanInfo";
import MakePlanTemplate from "./organism/makePlanTemplate";
import StudyPlanMainTemplate from "./template/studyPlanMainTemplate";
import ViewPlanTemplate from "./organism/viewPlanTemplate";
import EditPlanTemplate from "./organism/editPlanTemplate";
import { ActivePlanType } from "@/src/api/types/studyplan";
import { mainfetch } from "@/src/api/apis/mainFetch";

const StudyPlan = () => {
  // 완성 후 "" 을 초기값으로 변경
  const [planType, setPlanType] = useState<"MAKE" | "EDIT" | "VIEW">();
  const [activePlanData, setActivePlanData] = useState<ActivePlanType | null>(null);
  const handlePlanType = (type: "MAKE" | "EDIT" | "VIEW") => {
    setPlanType(type);
  };

  useEffect(() => {
    const getActivePlan = async () => {
      const res = await mainfetch("/plans/active", { method: "GET" }, true);
      if (res.status === 404) {
        setPlanType("MAKE");
        return;
      }

      if (!res.ok) {
        window.location.href = "/";
        throw new Error("알 수 없는 오류가 발생했습니다.");
      }
      const data = await res.json();
      setActivePlanData(data);
      setPlanType("VIEW");
    };
    getActivePlan();
  }, []);
  return (
    <ThemeProvider theme={globalTheme}>
      <MiddleBoxColumn>
        <Appbar />
        <StudyPlanMainTemplate>
          <UserPlanInfo />
          {planType === "MAKE" && <MakePlanTemplate handlePlanType={handlePlanType} />}
          {activePlanData && planType === "VIEW" && (
            <ViewPlanTemplate handlePlanType={handlePlanType} activePlanData={activePlanData} />
          )}
          {activePlanData && planType === "EDIT" && (
            <EditPlanTemplate handlePlanType={handlePlanType} activePlanData={activePlanData} />
          )}
        </StudyPlanMainTemplate>
        <Footer />
      </MiddleBoxColumn>
    </ThemeProvider>
  );
};
export default StudyPlan;
