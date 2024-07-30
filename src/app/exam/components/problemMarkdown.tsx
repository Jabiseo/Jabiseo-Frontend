import { Box, Typography } from "@mui/material";
import { memo } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
const ProblemMarkdown = memo(({ description }: { description: string }) => {
  return (
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
              variant="h3"
              fontSize={{
                xs: "14px",
                sm: "18px",
              }}
            >
              {content.children}
            </Typography>
          </Box>
        ),
        // span: ({ node, ...content }) =>
        //   node?.properties.className == "katex-html" ? (
        //     <></>
        //   ) : (
        //     <span>{content.children}</span>
        //   ),
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
      {description}
    </Markdown>
  );
});

export default ProblemMarkdown;
