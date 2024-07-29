import { Box, Grid, Slider, Typography } from "@mui/material";

import ArrowDoubleRight from "@/public/icons/arrow-double-right.svg";

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

interface MobileCountAndCheckUIProps {
  questionsCount: number;
  handleQuestionsCountChange: (event: Event, value: number | number[], activeThumb: number) => void;
  selectedSubjects: Subject[];
  numberOfQuestions: number;
}

const MobileCountAndCheckUI: React.FC<MobileCountAndCheckUIProps> = ({
  questionsCount,
  handleQuestionsCountChange,
  selectedSubjects,
  numberOfQuestions,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "520px",
      }}
    >
      <Typography variant="subtitle1" fontSize="14px">
        3. 과목 문제 수 설정과 총 문제 수 확인해주세요.
      </Typography>
      <Box
        sx={{
          backgroundColor: "white",
          paddingX: 1.5,
          borderRadius: "8px",
          border: "1px solid var(--c-gray2)",
          minHeight: "160px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              padding: 2,
              maxWidth: "140px",
              width: "100%",
              height: "100%",
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
                width: "100%",
                "& .MuiSlider-markLabel": {
                  fontSize: "12px",
                },
              }}
              size="small"
            />
          </Box>
          <Box minWidth="25px">
            <ArrowDoubleRight width={25} height={25} />
          </Box>

          <Box
            sx={{
              maxWidth: "140px",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                mb: "16px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: "2px" }}>
                <Typography variant="body2" fontSize={"14px"}>
                  선택 과목
                </Typography>
                <Typography variant="body2" fontSize={"14px"}>
                  {selectedSubjects.length}과목
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" fontSize={"14px"}>
                  과목 문제 수
                </Typography>
                <Typography variant="body2" fontSize={"14px"}>
                  {questionsCount}문제
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "108px",
              }}
            >
              <Typography variant="body1" fontSize={"12px"} color={"var(--c-gray3)"}>
                총 문제수
              </Typography>
              <Box
                sx={{
                  backgroundColor: "white",
                  border: "1px solid var(--c-sub3)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 1,
                  width: "70%",
                  mt: 0.5,
                }}
              >
                <Typography variant="body1" fontSize={"14px"}>
                  {numberOfQuestions}문제
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileCountAndCheckUI;
