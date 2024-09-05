import { Plan } from "@/src/api/types/studyplan";
import { Checkbox } from "@mui/material";
import CheckBoxIcon from "@/public/icons/checkBoxIcon.svg";
interface CheckBoxProps {
  selectedValue: Plan[];
  handleCheck: (e: any) => void;
  value: string;
}

const CheckBox = ({ selectedValue, handleCheck, value }: CheckBoxProps) => {
  return (
    <Checkbox
      checked={selectedValue.some(v => v.activityType === value)}
      disableRipple
      onChange={handleCheck}
      value={value}
      sx={{
        "&.Mui-checked": {
          color: "var(--c-sub3)",
        },
        padding: "0",
      }}
      icon={<CheckBoxIcon />}
    />
  );
};
export default CheckBox;
