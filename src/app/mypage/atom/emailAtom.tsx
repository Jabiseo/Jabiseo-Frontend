import { Box, Typography } from "@mui/material";

const EmailAtom = ({ email }: { email: string }) => {
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
        marginBottom="12px"
      >
        이메일
      </Typography>
      <Typography
        variant="body2"
        fontSize={{
          xs: "14px",
          sm: "18px",
        }}
      >
        {email}
      </Typography>
    </Box>
  );
};

export default EmailAtom;
