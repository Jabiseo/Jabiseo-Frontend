import { globalTheme } from "@/src/components/globalStyle";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Typography,
} from "@mui/material";

interface ExamChoiceProps {
  exams: ExamInfo[];
  handleExamChoice: (event: SelectChangeEvent) => void;
  selectedExam: string;
}

const ExamChoice: React.FC<ExamChoiceProps> = ({
  exams,
  handleExamChoice,
  selectedExam,
}: ExamChoiceProps) => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Box mt={4}>
        <Typography variant="h4" fontSize={"20px"}>
          시험 회차
        </Typography>
        <Box sx={{ my: 2, width: "100%" }}>
          <FormControl
            sx={{
              width: "80%",
              padding: "0",
            }}
          >
            <Select
              value={selectedExam}
              onChange={handleExamChoice}
              fullWidth
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 224,
                    overflowY: "auto",
                  },
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  boxSizing: "border-box",
                  padding: "14px 0",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              {exams.map((exam, index) => (
                <MenuItem
                  autoFocus={index === 1}
                  key={exam.examId}
                  value={exam.description}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#44bbd429",
                      color: "#44bbd429",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#44bbd429",
                    },
                    "&:hover": {
                      backgroundColor:
                        exam.description == selectedExam ? "#44bbd429" : "var(--c-gray1)",
                    },
                    "&:focus": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    fontSize={"18px"}
                    color={exam.description == selectedExam ? "var(--c-sub3)" : ""}
                  >
                    {exam.description}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ExamChoice;
