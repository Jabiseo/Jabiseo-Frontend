"use client";
import { useEffect, useState } from "react";
import MainHeader from "../components/MainHeader";
import ScrollAppbar from "../components/scrollAppbar";

export default function Home() {
  const [isScroll, setisScroll] = useState(0);

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
    <>
      <ScrollAppbar isScroll={isScroll} />
      <MainHeader />
    </>
  );
}
