"use client";
import Appbar from "@/src/components/Appbar";
import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import LearningFooter from "../../components/Footer";
import MakeProblemSetUI from "./components/MakeProblemSet";
import LearningHeader from "./components/learningHeader";
import SelectCertificate from "./components/selectCertificate";
import StatusBox from "./components/statusBox";

const makeProblemSetBase = () => {
  const [isCertificate, setisCertificate] = useState(false);

  useEffect(() => {
    const certificate = localStorage.getItem("certificate");
    if (certificate) {
      setisCertificate(true);
    }
  }, []);

  const handleIsCertificate = () => {
    setisCertificate(true);
  };
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Appbar />
      <LearningHeader />
      {isCertificate == true ? (
        <>
          <StatusBox />
          <MakeProblemSetUI />
        </>
      ) : (
        <SelectCertificate handleIsCertificate={handleIsCertificate} />
      )}
      {!isSm && <LearningFooter />}
    </>
  );
};

export default makeProblemSetBase;
