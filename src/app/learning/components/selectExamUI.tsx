import { Box, FormControlLabel, List, ListItem, Radio, Typography } from "@mui/material";

interface SelectExamUIProps {
  exams: ExamInfo[];
  selectedExamId: number;
  setSelectedExamId: (examId: number) => void;
  handleExamChange: (e: any) => void;
  leftBoxHeight: number;
}

const SelectExamUI: React.FC<SelectExamUIProps> = ({
  exams,
  selectedExamId,
  setSelectedExamId,
  handleExamChange,
  leftBoxHeight,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "520px",
        width: "100%",
        my: "14px",
      }}
    >
      <Typography
        variant="h4"
        fontSize={{
          xs: "14px",
          sm: "20px",
        }}
      >
        1. 연도를 선택해주세요
      </Typography>
      <Box
        sx={{
          marginTop: 2,
          backgroundColor: "white",
          borderRadius: "14px",
          border: "1px solid var(--c-gray2)",
          padding: "6px",
          height: { md: `${leftBoxHeight}px` },
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        <List>
          {exams &&
            exams.map(exam => (
              <ListItem key={exam.examId}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedExamId === exam.examId}
                      onChange={e => {
                        handleExamChange(e);
                        setSelectedExamId(exam.examId);
                      }}
                      value={exam.description}
                      sx={{
                        "&.Mui-checked": {
                          color: "var(--c-sub3)",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      fontSize={{
                        xs: "14px",
                        sm: "18px",
                      }}
                    >
                      {exam.description}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
};

export default SelectExamUI;
