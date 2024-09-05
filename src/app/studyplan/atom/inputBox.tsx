import { Plan } from "@/src/api/types/studyplan";
import { Input } from "@mui/material";
interface InputBoxProps {
  plan: Plan;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>, v: Plan) => void;
}
const InputBox = ({ plan, handleChangeValue }: InputBoxProps) => {
  return (
    <Input
      value={plan.targetValue === 0 ? "" : plan.targetValue}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeValue(event, plan);
      }}
      sx={{
        width: {
          xs: "36px",
          sm: "42px",
        },
        height: {
          xs: "28px",
          sm: "28px",
        },
        border: "1px solid var(--c-gray3)",
        borderRadius: "4px",
        fontSize: {
          xs: "12px",
          sm: "18px",
        },
        fontWeight: "400",
        padding: "3px 4px",
        "& .MuiInput-input": {
          textAlign: "center",
        },
      }}
      disableUnderline
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
        maxLength: 3,
      }}
    />
  );
};
export default InputBox;
