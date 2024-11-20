"use client";
import { mainfetch } from "@/src/api/apis/mainFetch";
import { ActivePlanType } from "@/src/api/types/studyplan";
import Appbar from "@/src/components/Appbar";
import { MiddleBoxColumn } from "@/src/components/elements/styledElements";
import Footer from "@/src/components/Footer";
import { globalTheme } from "@/src/components/globalStyle";
import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import UserPlanInfo from "./atom/userPlanInfo";
import EditPlanTemplate from "./organism/editPlanTemplate";
import MakePlanTemplate from "./organism/makePlanTemplate";
import ViewPlanTemplate from "./organism/viewPlanTemplate";
import StudyPlanMainTemplate from "./template/studyPlanMainTemplate";

const StudyPlan = () => {
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
        alert("먼저 마이페이지에서 자격증을 설정해주세요.");
        return;
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
        <Appbar background={true} />
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
