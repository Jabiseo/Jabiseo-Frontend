"use client";
import Appbar from "@/src/components/Appbar";
import { MiddleBoxColumn } from "@/src/components/elements/styledElements";
import ProblemList from "./components/problemList";
import ResultHeader from "./components/resultHeader";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { globalTheme } from "@/src/components/globalStyle";

const ExamResultPage = () => {
  const [problems, setProblems] = useState<ProblemViewType[]>([]);
  const [certificateInfo, setCertificateInfo] = useState<CertificateType>();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("problems")!);
    const problems = data.problems;
    const certificateInfo = data.certificateInfo;
    setProblems(problems);
    setCertificateInfo(certificateInfo);
  }, []);

  if (!certificateInfo || !problems) {
    return (
      <MiddleBoxColumn
        sx={{
          backgroundColor: "white",
        }}
      >
        <Appbar />
        <div>로딩중...</div>
      </MiddleBoxColumn>
    );
  }
  return (
    <ThemeProvider theme={globalTheme}>
      <MiddleBoxColumn
        sx={{
          backgroundColor: "white",
        }}
      >
        <Appbar />
        <ResultHeader certificateName={certificateInfo!.name} />
        <ProblemList problems={problems} />
      </MiddleBoxColumn>
    </ThemeProvider>
  );
};

export default ExamResultPage;
