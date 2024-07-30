"use client";
import Appbar from "@/src/components/Appbar";
import { Box } from "@mui/material";
import ExamMainUI from "../components/examMainUI";
import useProblems from "@/src/hooks/useProblems";
import dynamic from "next/dynamic";

const ExamHeader = dynamic(() => import("@/src/app/exam/components/examHeader"), {
  loading: () => <p>Header Loading</p>,
});

const ExamPage = () => {
  const { getProblems, certificateInfo, loading, error } = useProblems();
  if (loading) {
    return <div>로딩중...</div>;
  }
  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Appbar />
      <ExamHeader certificateName={certificateInfo!.name} />
      <ExamMainUI getProblems={getProblems!} loading={loading} error={error} />
    </Box>
  );
};
export default ExamPage;
