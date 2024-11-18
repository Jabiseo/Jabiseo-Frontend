"use client";
import Appbar from "@/src/components/Appbar";
import { Box } from "@mui/material";
import ExamMainUI from "../components/examMainUI";
import useProblems from "@/src/hooks/useProblems";
import ExamHeader from "../components/examHeader";
import LoadingUI from "@/src/components/loadingUI";

const ExamPage = () => {
  const { getProblems, certificateInfo, loading, error } = useProblems();
  if (loading) {
    return <LoadingUI />;
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
      <ExamMainUI
        getProblems={getProblems!}
        loading={loading}
        error={error}
        certificateInfo={certificateInfo!}
      />
    </Box>
  );
};
export default ExamPage;
