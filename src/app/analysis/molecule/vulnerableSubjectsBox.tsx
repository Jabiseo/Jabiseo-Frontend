import { Box, Typography } from "@mui/material";
import VulnerableSubjectItem from "./vulnerableSubjectItem";

interface VulnerableSubjectsBoxProps {
  title: string;
  userName: string;
  vulnerableSubjects: VulnerableSubject[];
}
const VulnerableSubjectsBox = ({
  title,
  userName,
  vulnerableSubjects,
}: VulnerableSubjectsBoxProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: {
          xs: "20px 18px",
          sm: "40px 36px",
        },
        boxSizing: "border-box",
        borderRadius: "12px",
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="h1"
        fontSize={{
          xs: "14px",
          sm: "24px",
        }}
        marginBottom={{
          xs: "20px",
          sm: "32px",
        }}
      >
        {userName}님의 {title}
      </Typography>
      {vulnerableSubjects.map((item, index) => (
        <VulnerableSubjectItem key={item.subjectId} item={item} index={index + 1} />
      ))}
    </Box>
  );
};

export default VulnerableSubjectsBox;
