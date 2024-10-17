"use client";
import Appbar from "@/src/components/Appbar";
import { MiddleBoxColumn } from "@/src/components/elements/styledElements";
import ProblemList from "./components/problemList";
import ResultHeader from "./components/resultHeader";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { globalTheme } from "@/src/components/globalStyle";
import { useRouter } from "next/navigation";
import LoadingUI from "@/src/components/loadingUI";

const ExamResultPage = () => {
  const [problems, setProblems] = useState<ProblemViewType[]>([]);
  const [certificateInfo, setCertificateInfo] = useState<CertificateType>();
  const [learningTime, setLearningTime] = useState<string>("00초");
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("problems")) {
      router.push("/");
    }
    const data = JSON.parse(localStorage.getItem("problems")!);
    const problems = data.problems;
    const certificateInfo = data.certificateInfo;
    const learningTime = data.learningTime;
    setProblems(problems);
    setCertificateInfo(certificateInfo);
    setLearningTime(learningTime);
  }, []);

  if (!certificateInfo || !problems) {
    return <LoadingUI />;
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
        <ProblemList problems={problems} setProblems={setProblems} learningTime={learningTime} />
      </MiddleBoxColumn>
    </ThemeProvider>
  );
};

export default ExamResultPage;
