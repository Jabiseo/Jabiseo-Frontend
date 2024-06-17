"use client";
import GridBase from "@/src/components/gridBase";
import MakeProblemSetUI from "./components/MakeProblemSet";

const makeProblemSetBase = () => {
  return (
    <>
      <GridBase main={<MakeProblemSetUI />} />;
    </>
  );
};

export default makeProblemSetBase;
