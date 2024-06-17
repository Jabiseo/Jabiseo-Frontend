"use client";
import GridBase from "@/src/components/gridBase";
import ProblemList from "./components/problemList";

const ExamResultPage = () => {
  return (
    <>
      <GridBase main={<ProblemList />} />
    </>
  );
};

export default ExamResultPage;
