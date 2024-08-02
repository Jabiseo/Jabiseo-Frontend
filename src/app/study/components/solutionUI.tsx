import EyeClosedLineIcon from "@/public/icons/eye-closed-line.svg";
import EyeLineIcon from "@/public/icons/eye-line.svg";
import { Box, Button, Typography } from "@mui/material";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";

interface SolutionUIProps {
  solution: string;
  tabValue: number;
  handleView: () => void;
  isView: boolean;
}

const SolutionUI: React.FC<SolutionUIProps> = props => {
  const { solution, tabValue, handleView, isView } = props;
  return (
    <Box
      sx={{
        marginBottom: "70px",
        width: "100%",
        padding: "22px",
        boxSizing: "border-box",
      }}
    >
      {isView ? (
        <EyeLineIcon width={28} height={28} />
      ) : (
        <EyeClosedLineIcon width={28} height={28} />
      )}
      {isView ? (
        <Box
          sx={{
            overflowWrap: "break-word",
            minHeight: "400px",
            marginTop: "12px",
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
      ) : tabValue === 0 ? (
        <Box
          sx={{
            minHeight: "400px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleView}
            sx={{
              "&:hover": {
                cursor: "pointer",
                border: "2px solid var(--c-sub3)",
                backgroundColor: "white",
              },
              boxShadow: "0 0 0 1px var(--c-gray2)",
              borderRadius: "40px",
              paddingY: "10px",
              paddingLeft: "24px",
              paddingRight: "32px",
            }}
          >
            <EyeLineIcon width={28} height={28} />
            <Typography
              variant="subtitle1"
              fontSize={{
                xs: "14px",
                sm: "18px",
              }}
              ml={1}
            >
              해설 보기
            </Typography>
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            minHeight: "400px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleView}
            sx={{
              "&:hover": {
                cursor: "pointer",
                border: "2px solid var(--c-sub3)",
                backgroundColor: "white",
              },
              boxShadow: "0 0 0 1px var(--c-gray2)",
              borderRadius: "40px",
              paddingY: "10px",
              paddingLeft: "24px",
              paddingRight: "32px",
            }}
          >
            <EyeLineIcon width={28} height={28} />
            <Typography
              variant="subtitle1"
              fontSize={{
                xs: "14px",
                sm: "18px",
              }}
              ml={1}
            >
              이론 보기
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SolutionUI;
