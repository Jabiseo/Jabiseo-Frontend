import { Box, Slider, Typography } from "@mui/material";

const marks = [
  { value: 0, label: "0" },
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

function valuetext(value: number) {
  return `${value}`;
}

interface SelectProblemCountUIProps {
  leftBoxHeight2: number;
  questionsCount: number;
  handleQuestionsCountChange: (event: Event, value: number | number[], activeThumb: number) => void;
}

const SelectProblemCountUI: React.FC<SelectProblemCountUIProps> = ({
  leftBoxHeight2,
  questionsCount,
  handleQuestionsCountChange,
}) => {
  return (
    <Box
      sx={{
        maxWidth: "520px",
        width: "100%",
      }}
    >
      <Typography variant="h4" fontSize={"20px"}>
        3. 과목 문제 수를 설정해주세요
      </Typography>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "12px",
          border: "1px solid var(--c-gray2)",
          boxSizing: "border-box",
          height: `${leftBoxHeight2}px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          padding: "50px 40px 20px 36px",
        }}
      >
        <Slider
          aria-label="Question Count"
          defaultValue={20}
          value={questionsCount}
          onChange={handleQuestionsCountChange}
          getAriaValueText={valuetext}
          step={1}
          marks={marks}
          min={0}
          max={20}
          valueLabelDisplay="auto"
          sx={{
            color: "var(--c-sub3)",
            width: "80%",
            "& .MuiSlider-thumb": {
              boxShadow: "0 0 0 10px rgba(68,187,212, 0.16)",
            },
            "& .MuiSlider-thumb:hover": {
              boxShadow: "0 0 0 10px rgba(68,187,212, 0.16)",
            },
            "& .MuiSlider-thumbActive": {
              boxShadow: "0 0 0 10px rgba(68,187,212, 0.16)",
            },
          }}
        />
      </Box>
    </Box>
  );
};
export default SelectProblemCountUI;
