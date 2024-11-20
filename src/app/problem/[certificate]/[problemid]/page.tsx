"use client";
import { mainfetch } from "@/src/api/apis/mainFetch";
import Appbar from "@/src/components/Appbar";
import { globalTheme } from "@/src/components/globalStyle";
import { Box, CircularProgress, ThemeProvider } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ProblemHeader from "../../organism/problemHeader";
import ProblemMain from "../../organism/problemMain";
import { MiddleBoxColumn } from "@/src/components/elements/styledElements";
import { useRouter } from "next/navigation";

const ProblemMainPage = ({
  params,
}: {
  params: {
    certificate: string;
    problemid: number;
  };
}) => {
  const certificate = decodeURIComponent(params.certificate);
  const problemid = params.problemid;
  const [problem, setProblem] = useState<ProblemDetailType>();
  const router = useRouter();
  const goToSimilarProblem = (problemId: number) => {
    router.push(`/problem/${certificate}/${problemId}`);
  };
  useEffect(() => {
    const getProblem = async () => {
      const isLogin = localStorage.getItem("accessToken") !== null;
      const res = await mainfetch(
        `/problems/${problemid}`,
        {
          method: "GET",
        },
        isLogin
      );
      if (res.status !== 200) {
        window.location.href = "/";
        return;
      }
      const data = await res.json();
      data.chooseNumber = -1;
      if (localStorage.getItem("accessToken") !== null) {
        const similarRes = await mainfetch(
          `/problems/${problemid}/similar`,
          {
            method: "GET",
          },
          true
        );
        if (similarRes.status == 200) {
          const similarData = await similarRes.json();
          data.similarProblems = similarData;
        }
      }
      setProblem(data);
    };
    getProblem();
  }, [problemid]);

  if (!problem)
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <CircularProgress />
      </Box>
    );
  return (
    <ThemeProvider theme={globalTheme}>
      <Appbar />
      <ProblemHeader certificateName={certificate} />
      <MiddleBoxColumn
        sx={{
          backgroundColor: "white",
        }}
      >
        <ProblemMain
          problem={problem}
          setProblem={setProblem as Dispatch<SetStateAction<ProblemDetailType>>}
          goToSimilarProblem={goToSimilarProblem}
        />
      </MiddleBoxColumn>
    </ThemeProvider>
  );
};

export default ProblemMainPage;
