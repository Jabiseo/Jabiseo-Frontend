import { TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputBoxProps {
  text: string;
  handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInputBox = ({ text, handleChangeText }: SearchInputBoxProps) => {
  return (
    <TextField
      fullWidth
      onChange={handleChangeText}
      sx={{
        borderRadius: "40px",
        border: "2px solid var(--c-sub3)",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
      placeholder="내용을 입력해주세요"
      InputProps={{
        endAdornment: <SearchIcon sx={{ color: "action.active", mr: 1 }} />,
      }}
      inputProps={{
        style: { padding: "20px 36px" },
        sx: { fontSize: { xs: "14px", sm: "18px" } },
      }}
      InputLabelProps={{
        shrink: true,
        style: { display: "none" },
      }}
      value={text}
    />
  );
};

export default SearchInputBox;
