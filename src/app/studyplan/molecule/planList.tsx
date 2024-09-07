import EditIcon from "@/public/icons/edit-for-plan.svg";
import { Plan } from "@/src/api/types/studyplan";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import PlanListItem from "./planListItem";

interface PlanListProps {
  handlePlanType: (type: "MAKE" | "EDIT" | "VIEW") => void;
  planItems: Plan[];
  text: string;
}

const PlanList: React.FC<PlanListProps> = ({ planItems, text, handlePlanType }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      marginTop={{
        xs: "40px",
        sm: "80px",
      }}
    >
      <Box
        marginBottom={{
          xs: "24px",
          sm: "36px",
        }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingX: {
            xs: "25px",
            sm: "0px",
          },
        }}
      >
        <Typography
          variant="h1"
          fontSize={{
            xs: "16px",
            sm: "28px",
          }}
        >
          {text} 플랜
        </Typography>

        <Box
          sx={{
            borderRadius: {
              xs: "50%",
              sm: "40px",
            },
            border: "1.5px solid var(--c-gray2)",
            backgroundColor: "white",
            padding: {
              xs: "8px",
              sm: "8px 28px",
            },
            "&:hover": {
              cursor: "pointer",
            },
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => handlePlanType("EDIT")}
        >
          <EditIcon width={isSm ? 16 : 24} height={isSm ? 16 : 24} color={"var(--c-main)"} />
          <Typography
            variant="subtitle1"
            fontSize={{
              xs: "14px",
              sm: "18px",
            }}
            marginLeft="10px"
            display={{
              xs: "none",
              sm: "block",
            }}
          >
            수정하기
          </Typography>
        </Box>
      </Box>
      {planItems.length === 0 ? (
        <Typography>문제 풀이 기록이 없습니다.</Typography>
      ) : (
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: {
              xs: "0px",
              sm: "12px",
            },
            border: {
              xs: "none",
              sm: "1px solid var(--c-gray2)",
            },
          }}
        >
          {planItems.map((plan, index) => {
            return <PlanListItem index={index + 1} planItem={plan} key={index} />;
          })}
        </Box>
      )}
    </Box>
  );
};

export default PlanList;
