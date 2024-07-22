import { globalTheme } from "@/src/components/globalStyle";
import { Box, Checkbox, FormControlLabel, ThemeProvider, Typography } from "@mui/material";

interface SubjectChoiceProps {
  subjects: Subject[];
  handleSubjectChoice: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedSubjects: Subject[];
}

const SubjectChoice: React.FC<SubjectChoiceProps> = ({
  subjects,
  handleSubjectChoice,
  selectedSubjects,
}: SubjectChoiceProps) => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Box>
        <Typography variant="h4" fontSize={"20px"}>
          과목
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "16px",
          }}
        >
          {subjects.map((subject, index) => (
            <FormControlLabel
              key={subject.subjectId}
              control={
                <Checkbox
                  checked={selectedSubjects.includes(subject)}
                  onChange={handleSubjectChoice}
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
                    xs: "18px",
                  }}
                  paddingTop={"4.5px"}
                >
                  {index + 1}과목 : {subject.name}
                </Typography>
              }
            />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default SubjectChoice;
