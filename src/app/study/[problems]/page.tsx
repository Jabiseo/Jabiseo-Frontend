"use client";

import Appbar from "@/src/components/Appbar";
import { MiddleBoxColumn } from "@/src/components/elements/styledElements";
import StudyMainUI from "../components/studyMainUI";
import dynamic from "next/dynamic";
import useProblems from "@/src/hooks/useProblems";

const StudyHeader = dynamic(() => import("@/src/app/study/components/studyHeader"), {
  loading: () => <p>Header Loading</p>,
});

const studyPage = () => {
  const { getProblems, certificateInfo, loading, error } = useProblems();
  if (loading) {
    return <div>로딩중...</div>;
  }
  return (
    <MiddleBoxColumn
      sx={{
        backgroundColor: "white",
      }}
    >
      <Appbar />
      <StudyHeader certificateName={certificateInfo!.name} />
      <StudyMainUI getProblems={getProblems!} loading={loading} error={error} />
    </MiddleBoxColumn>
  );
};
export default studyPage;
