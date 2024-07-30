import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";

export const NoHoverButton = styled(Button)({
  "&:hover": {
    backgroundColor: "inherit",
  },
});

export const MiddleBoxColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

export const MiddleBoxRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

interface NoHoverTouchButtonProps {
  sx?: object;
  children: React.ReactNode;
  onClick?: () => any;
  href?: string;
}
export const NoHoverTouchButton: React.FC<NoHoverTouchButtonProps> = ({
  sx,
  children,
  onClick,
  href,
}) => {
  return (
    <Button
      disableTouchRipple
      sx={{
        "&:hover": {
          backgroundColor: "inherit",
        },
        ...sx,
      }}
      onClick={onClick}
      href={href}
    >
      {children}
    </Button>
  );
};
