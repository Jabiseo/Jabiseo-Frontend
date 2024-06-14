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
다음 두 릴레이션에서 외래키로 사용된 것은? (단 밑줄 친 속성은 기본키이다.)<br>     <br>![20년_1,2회차 42번](https://storage.googleapis.com/machuda/hwp/2023-04-19T15:33:33.183993)<br>

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
