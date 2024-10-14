import { Box, Typography } from "@mui/material";
import VulnerableTagItem from "./vulnerableTagItem";

interface VulnerableTagsBoxProps {
  title: string;
  userName: string;
  VulnerableTags: VulnerableTag[];
}
const VulnerableTagsBox = ({ title, userName, VulnerableTags }: VulnerableTagsBoxProps) => {
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
      {VulnerableTags.map((item, index) => (
        <VulnerableTagItem key={item.tagId} item={item} index={index + 1} />
      ))}
    </Box>
  );
};

export default VulnerableTagsBox;
