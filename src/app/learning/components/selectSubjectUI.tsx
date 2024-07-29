import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

interface SelectSubjectUIProps {
  subjects: Subject[];
  selectedSubjects: Subject[];
  handleSubjectChange: (e: any) => void;
  rightBoxRef: any;
}

const SelectSubjectUI: React.FC<SelectSubjectUIProps> = ({
  subjects,
  selectedSubjects,
  handleSubjectChange,
  rightBoxRef,
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
        2. 과목을 선택해주세요
      </Typography>
      <Box
        ref={rightBoxRef}
        sx={{
          marginTop: 2,
          backgroundColor: "white",
          borderRadius: "14px",
          border: "1px solid var(--c-gray2)",
          padding: {
            xs: "14px",
            sm: "36px",
          },
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {subjects &&
          subjects.map(subject => (
            <FormControlLabel
              key={subject.subjectId}
              control={
                <Checkbox
                  checked={selectedSubjects.includes(subject)}
                  onChange={handleSubjectChange}
                  value={subject.name}
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
                  {subject.name}
                </Typography>
              }
            />
          ))}
      </Box>
    </Box>
  );
};
export default SelectSubjectUI;
