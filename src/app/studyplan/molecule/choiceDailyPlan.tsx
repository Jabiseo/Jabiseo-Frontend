import { Plan } from "@/src/api/types/studyplan";
import { Box, Typography } from "@mui/material";
import CheckBox from "../atom/checkBox";
import InputBox from "../atom/inputBox";

interface ChoiceDailyPlanProps {
  plans: Plan[];
  selectedValue: Plan[];
  handleCheck: (e: any) => void;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>, v: Plan) => void;
  description: string;
}

const ChoiceDailyPlan = ({
  plans,
  selectedValue,
  handleCheck,
  handleChangeValue,
  description,
}: ChoiceDailyPlanProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "12px",
        border: "1px solid var(--c-gray3)",
        padding: {
          xs: "12px 16px",
          sm: "20px 40px",
        },
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <Typography
        variant="body2"
        sx={{ marginBottom: "12px" }}
        color="var(--c-gray4)"
        fontSize={{
          xs: "12px",
          sm: "18px",
        }}
      >
        {description}
      </Typography>
      <Box>
        {plans.map(v => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingY: "6px",
            }}
            key={v.activityType}
          >
            <CheckBox
              selectedValue={selectedValue}
              handleCheck={handleCheck}
              value={v.activityType}
            />
            <Typography
              variant="body2"
              fontSize={{
                xs: "14px",
                sm: "18px",
              }}
              sx={{
                marginX: "8px",
              }}
            >
              {v.descriptionLeft}
            </Typography>
            <InputBox plan={v} handleChangeValue={handleChangeValue} />
            <Typography
              variant="body2"
              fontSize={{
                xs: "14px",
                sm: "18px",
              }}
              sx={{
                marginLeft: "8px",
                wordBreak: "break-all",
              }}
            >
              {v.descriptionRight}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default ChoiceDailyPlan;
