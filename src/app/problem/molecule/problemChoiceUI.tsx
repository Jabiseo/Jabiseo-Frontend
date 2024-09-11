import { Box, Typography } from "@mui/material";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import CircleNumber1 from "@/public/icons/circle-number1.svg";
import CircleNumber2 from "@/public/icons/circle-number2.svg";
import CircleNumber3 from "@/public/icons/circle-number3.svg";
import CircleNumber4 from "@/public/icons/circle-number4.svg";
import React from "react";

interface ProblemChoiceUIProps {
  choiceNumber: number;
  problem: ProblemDetailType;
  chooseAnswer: (answer: number) => void;
  color: string;
}

const ProblemChoiceUI: React.FC<ProblemChoiceUIProps> = React.memo(
  ({ choiceNumber, problem, chooseAnswer, color }) => {
    return (
      <Box
        onClick={() => {
          chooseAnswer(choiceNumber + 1);
        }}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          borderRadius: 2,
          "&:hover": {
            bgcolor: problem.chooseNumber === -1 ? "var(--c-grey)" : "",
          },
          backgroundColor: color,
          fontSize: "1rem",
          paddingY: "12px",
        }}
      >
        {choiceNumber === 0 ? (
          <CircleNumber1 width={28} height={28} />
        ) : choiceNumber === 1 ? (
          <CircleNumber2 width={28} height={28} />
        ) : choiceNumber === 2 ? (
          <CircleNumber3 width={28} height={28} />
        ) : choiceNumber === 3 ? (
          <CircleNumber4 width={28} height={28} />
        ) : null}
        <Markdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          components={{
            p: ({ node, ...content }) => (
              <Box
                sx={{
                  width: "100%",
                  px: "8px",
                  pt: "2px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  fontSize={{
                    xs: "14px",
                    sm: "18px",
                  }}
                >
                  {content.children}
                </Typography>
              </Box>
            ),
          }}
        >
          {problem.choices[choiceNumber].choice}
        </Markdown>
      </Box>
    );
  }
);

ProblemChoiceUI.displayName = "ProblemChoiceUI";
export default ProblemChoiceUI;
