"use client";
import Appbar from "@/src/components/Appbar";
import { MiddleBoxColumn } from "@/src/components/elements/styledElements";
import Footer from "@/src/components/Footer";
import { globalTheme } from "@/src/components/globalStyle";
import { ThemeProvider } from "@mui/material";
import UserAnalysisInfo from "./atom/UserAnalysisInfo";
import RecommendTest from "./molecule/recommendTest";
import AnalysisReportOrganism from "./organism/analysisReportOrganism";
import StudyCurrentOrganism from "./organism/studyCurrentOrganism";
import AnalysisMainTemplate from "./template/analysisMainTemplate";

const AnalyzeMainPage = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Appbar background={true} />
      <MiddleBoxColumn>
        <AnalysisMainTemplate top={true}>
          <UserAnalysisInfo />
          <StudyCurrentOrganism />
        </AnalysisMainTemplate>
        <RecommendTest />
        <AnalysisMainTemplate top={false}>
          <AnalysisReportOrganism />
        </AnalysisMainTemplate>
        <Footer />
      </MiddleBoxColumn>
    </ThemeProvider>
  );
};

export default AnalyzeMainPage;
