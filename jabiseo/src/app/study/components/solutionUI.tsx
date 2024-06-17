import { Box, Typography } from "@mui/material";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";

interface SolutionUIProps {
  solution: string;
}

const SolutionUI: React.FC<SolutionUIProps> = ({ solution }) => {
  return (
    <>
      <Box
        sx={{
          fontSize: "16px",
          fontFamily: "Pretendard-Regular",
          border: "1px solid black",
          minHeight: "300px",
          mt: 2,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: 2,
          marginBottom: "70px",
        }}
      >
        <Box
          sx={{
            fontSize: { xs: "1.1rem", md: "1rem" },
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
                  {content.children}
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
    </>
  );
};

export default SolutionUI;
