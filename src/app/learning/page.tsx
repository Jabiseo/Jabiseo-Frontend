"use client";
import { MiddleBoxColumn } from "@/src/components/elements/styledElements";
import ScrollAppbar from "@/src/components/scrollAppbar";
import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import LearningFooter from "../../components/Footer";
import MakeProblemSetUI from "./components/MakeProblemSet";
import LearningHeader from "./components/learningHeader";
import SelectCertificate from "./components/selectCertificate";
import StatusBox from "./components/statusBox";

const makeProblemSetBase = () => {
  const [isCertificate, setisCertificate] = useState(false);
  const [isScroll, setisScroll] = useState(0);
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
  const isMd = useMediaQuery(theme.breakpoints.down(960));

  const handleScroll = () => {
    setisScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); //clean up
    };
  }, []);

  return (
    <MiddleBoxColumn>
      <ScrollAppbar isScroll={isScroll} />
      <LearningHeader />
      {isCertificate == true ? (
        <MiddleBoxColumn>
          <StatusBox />
          <MakeProblemSetUI />
        </MiddleBoxColumn>
      ) : (
        <SelectCertificate handleIsCertificate={handleIsCertificate} />
      )}
      {!isMd && <LearningFooter />}
    </MiddleBoxColumn>
  );
};

export default makeProblemSetBase;
