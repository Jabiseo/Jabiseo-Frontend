import { Box, Typography } from "@mui/material";
import ProfileImage from "../atom/profileImage";
interface ProfileMoleculeProps {
  profileImage: string;
  isSm: boolean;
  isEdit: boolean;
}
const ProfileMolecule = ({ profileImage, isSm, isEdit }: ProfileMoleculeProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        paddingY: "36px",
      }}
    >
      <Typography
        variant="h1"
        fontSize={{
          xs: "16px",
          sm: "20px",
        }}
      >
        프로필
      </Typography>
      <ProfileImage initialProfileImage={profileImage} isSm={isSm} isEdit={isEdit} />
    </Box>
  );
};

export default ProfileMolecule;
