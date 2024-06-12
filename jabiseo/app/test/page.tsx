"use client";
import { Box } from "@mui/material";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

const makeProblemSet = () => {
  const mark = `
The quadratic formula is:
$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$
  `;
  const mark2 = "![img](https://storage.googleapis.com/machuda/hwp/2023-04-19T15:33:32.334471)";
  const mark3 = `
다음 설명에 해당하는 시스템으로 옳은 것은?<br> <br><img width="300" src="https://storage.googleapis.com/machuda/hwp/2023-04-19T11:47:26.596099500" /> asda<br>
awdawdawd
  `;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex, rehypeRaw]}>
        {mark3}
      </Markdown>
    </Box>
  );
};
export default makeProblemSet;
