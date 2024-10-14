import { Box, Button, Typography } from "@mui/material";
import ProgressBar from "../atom/progressBar";

interface VulnerableSubjectItemProps {
  item: VulnerableSubject;
  index: number;
}

const VulnerableSubjectItem: React.FC<VulnerableSubjectItemProps> = ({ item, index }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: {
          xs: "flex-start",
          md: "center",
        },
        padding: {
          xs: "20px 0px",
          md: "24px 0px",
        },
        width: "100%",
        justifyContent: {
          xs: "flex-start",
          md: "space-between",
        },
        boxSizing: "border-box",
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      <Typography
        variant="h4"
        fontSize={{
          xs: "14px",
          sm: "20px",
        }}
      >
        {index}. {item.subjectName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: {
            xs: "20px",
            md: "0px",
          },
          width: {
            xs: "100%",
            md: "auto",
          },
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
          <Box
            sx={{
              width: "1px",
              height: "27px",
              backgroundColor: "var(--c-gray2)",
              marginX: {
                xs: "16px",
                md: "24px",
              },
            }}
          />
        </Box>
        <Button
          disableTouchRipple
          disabled={item.vulnerableRate == 100}
          sx={{
            "&:hover": {
              backgroundColor: item.vulnerableRate !== 100 ? "var(--c-main)" : "var(--c-gray2)",
              cursor: item.vulnerableRate == 100 ? "default" : "pointer",
            },
            backgroundColor: item.vulnerableRate !== 100 ? "var(--c-main)" : "var(--c-gray2)",
            borderRadius: "40px",
            padding: "8px 18px",
          }}
          href="/learning"
        >
          <Typography
            variant="h4"
            fontSize={{
              xs: "12px",
              sm: "16px",
            }}
            color="white"
          >
            문제 풀러 가기
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default VulnerableSubjectItem;
