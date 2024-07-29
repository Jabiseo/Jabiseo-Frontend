// "use client";
import { Container } from "@mui/material";
import Appbar from "../components/Appbar";
import MainHeader from "../components/MainHeader";
// import { useEffect } from "react";

export default function Home() {
  // useEffect(() => {
  //   localStorage.setItem("focusTap", "");
  // }, []);
  return (
    <>
      <Appbar />
      <MainHeader />
    </>
  );
}
