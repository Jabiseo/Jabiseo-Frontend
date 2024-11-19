import { Box, Typography } from "@mui/material";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";

interface SolutionUIProps {
  solution: string;
}

const SolutionUI = ({ solution }: SolutionUIProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: {
          xs: "16px 14px",
          sm: "24px 16px",
        },
        boxSizing: "border-box",
        minHeight: "400px",
      }}
    >
      <Box
        sx={{
          overflowWrap: "break-word",
        }}
      >
        <Markdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          components={{
            p: ({ node, ...content }) => (
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontSize={{
                    xs: "14px",
                    sm: "18px",
                  }}
                >
                  {content.children}
                </Typography>
              </Box>
            ),
            img: ({ node, ...content }) => (
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={content.src}
                  alt={content.alt}
                  style={{ objectFit: "cover", width: "100%", maxWidth: "300px" }}
                />
              </Box>
            ),
          }}
        >
          {solution}
        </Markdown>
      </Box>
    </Box>
  );
};

export default SolutionUI;
