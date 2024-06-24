"use client";
import GridBase from "@/src/components/gridBase";
import MakeProblemSetUI from "./components/MakeProblemSet";
import { useEffect, useState } from "react";
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
  return (
    <>
      <StatusBox />
      <GridBase
        main={
          isCertificate == true ? (
            <MakeProblemSetUI />
          ) : (
            <SelectCertificate handleIsCertificate={handleIsCertificate} />
          )
        }
      />
      ;
    </>
  );
};

export default makeProblemSetBase;
