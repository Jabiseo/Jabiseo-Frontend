import { Box, Button, Typography } from "@mui/material";
import ProgressBar from "../atom/progressBar";

interface VulnerableTagItemProps {
  item: VulnerableTag;
  index: number;
}

const VulnerableTagItem: React.FC<VulnerableTagItemProps> = ({ item, index }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: {
          xs: "20px 0px",
          md: "24px 0px",
        },
        width: "100%",
        justifyContent: "space-between",
        boxSizing: "border-box",
        flexDirection: "row",
      }}
    >
      <Typography
        variant="h4"
        fontSize={{
          xs: "14px",
          sm: "20px",
        }}
      >
        {index}. {item.tagName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: {
            xs: "20px",
            md: "0px",
          },
          width: "auto",
          justifyContent: {
            xs: "space-between",
            md: "flex-end",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              alignItems: {
                xs: "flex-start",
                md: "center",
              },
            }}
          >
            <ProgressBar progress={item.vulnerableRate} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: {
                  xs: "8px",
                  md: "0px",
                },
              }}
            >
              <Typography
                variant="h4"
                fontSize={{
                  xs: "14px",
                  sm: "20px",
                }}
                marginLeft={{
                  xs: "0px",
                  md: "24px",
                }}
              >
                취약률&nbsp;
              </Typography>
              <Typography
                variant="h4"
                fontSize={{
                  xs: "14px",
                  sm: "20px",
                }}
                color="var(--c-main)"
                minWidth="51px"
              >
                {item.vulnerableRate}%
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VulnerableTagItem;
