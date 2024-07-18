"use client";
import { Container } from "@mui/material";
import Appbar from "../components/Appbar";
import MainHeader from "../components/MainHeader";

export default function Home() {
  return (
    <>
      <Appbar />
      <MainHeader />
      <Container maxWidth="lg"></Container>
    </>
  );
}
