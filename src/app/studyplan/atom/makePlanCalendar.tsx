import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/ko";
const MakePlanCalendar = ({ setEndDate }: { setEndDate: (date: Date) => void }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <DatePicker
        defaultValue={dayjs(new Date())}
        slotProps={{
          calendarHeader: { format: "YYYY.MM" },
          layout: {
            sx: {
              "& .MuiButtonBase-root": {
                "&.MuiPickersDay-root": {
                  "&.Mui-selected": {
                    backgroundColor: "var(--c-sub3)",
                  },
                },
              },
            },
          },
          popper: {
            sx: {
              "& .MuiPickersMonth-monthButton.Mui-selected": {
                backgroundColor: "var(--c-sub3)",
              },
              "& .MuiPickersMonth-monthButton.Mui-selected:focus": {
                backgroundColor: "var(--c-sub3)",
              },
            },
          },
          textField: {
            sx: {
              "& .MuiInputBase-root.MuiOutlinedInput-root": {
                fontSize: {
                  xs: "14px",
                  sm: "18px",
                },
                width: {
                  xs: "204px",
                  sm: "274px",
                },
                height: "44px",
                fontWeight: 400,
                backgroundColor: "white",
                "&.Mui-focused fieldset": {
                  borderColor: "var(--c-sub3)",
                },
              },
            },
          },
        }}
        format="YYYY. MM. DD"
        views={["month", "day"]}
        disablePast
        showDaysOutsideCurrentMonth
        sx={{
          borderRadius: "8px",
        }}
        onChange={date => {
          if (date) {
            setEndDate(date.toDate());
          }
        }}
      />
    </LocalizationProvider>
  );
};
export default MakePlanCalendar;
