"use client";
import { Box, Container, Grid } from "@mui/material";
import MakeProblemSetUI from "./components/MakeProblemSet";
import Appbar from "@/src/components/Appbar";
import GridBase from "@/src/components/gridBase";

const makeProblemSetBase = () => {
  return (
    <>
      <GridBase main={<MakeProblemSetUI />} />;
    </>

  );
};

export default makeProblemSetBase;
