"use client";

import Appbar from "@/src/components/Appbar";
import { MiddleBoxColumn } from "@/src/components/elements/styledElements";
import StudyMainUI from "../components/studyMainUI";
import dynamic from "next/dynamic";

const StudyHeader = dynamic(() => import("@/src/app/study/components/studyHeader"), {
  loading: () => <p>Header Loading</p>,
});

const studyPage = () => {
  return (
    <MiddleBoxColumn
      sx={{
        backgroundColor: "white",
      }}
    >
      <Appbar />
      <StudyHeader />
      <StudyMainUI />
    </MiddleBoxColumn>
  );
};
export default studyPage;
