import { mainfetch } from "@/src/api/apis/mainFetch";
import Appbar from "@/src/components/Appbar";
import { Box } from "@mui/material";
import ExamHeader from "../components/examHeader";
import ExamMainUI from "../components/examMainUI";

const getProblemFetch = async () => {
  const path = "certificate-id=1&subject-id=1,2,3,4,5&count=20";
  const response = await mainfetch<null>("/problems/set?" + path, { method: "GET" }, false);
  const data = await response.json();
  const newProblems = data.map((problem: Problem, index: number) => {
    return {
      ...problem,
      chooseNumber: -1,
      viewSolution: false,
      viewTheory: false,
      problemNumber: index + 1,
    };
  });
  return newProblems;
};

const studyPage = async () => {
  const getProblems: ProblemViewType[] = await getProblemFetch();
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
      <ExamHeader />
      <ExamMainUI getProblems={getProblems} />
    </Box>
  );
};
export default studyPage;
