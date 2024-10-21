import { Box, Typography } from "@mui/material";

interface SimilarProblemItemProps {
  similarProblem: SimilarProblem;
  goToSimilarProblem: (problemId: number) => void;
}
const SimilarProblemItem = ({ similarProblem, goToSimilarProblem }: SimilarProblemItemProps) => {
  const removeExclamationSentence = (description: string) => {
    return description.replace(/![^)]*\)/g, "");
  };

  const cleanedDescription = removeExclamationSentence(similarProblem.description);
  return (
    <Box
      sx={{
        border: "1.5px solid var(--c-gray2)",
        borderRadius: "12px",
        marginY: "6px",
        padding: {
          xs: "12px 14px",
          sm: "16px 28px",
        },
        "&:hover": {
          border: "1.5px solid var(--c-sub3)",
          boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.12)",
          cursor: "pointer",
        },
      }}
      onClick={() => {
        goToSimilarProblem(similarProblem.problemId);
      }}
    >
      <Typography
        fontSize={{
          xs: "12px",
          sm: "18px",
        }}
        color="var(--c-gray4)"
        marginBottom="4px"
        variant="body2"
      >
        {similarProblem.examInfo.description} ({similarProblem.subjectInfo.name})
      </Typography>
      <Typography
        fontSize={{
          xs: "12px",
          sm: "18px",
        }}
        variant="subtitle1"
      >
        {cleanedDescription}
      </Typography>
    </Box>
  );
};

export default SimilarProblemItem;
