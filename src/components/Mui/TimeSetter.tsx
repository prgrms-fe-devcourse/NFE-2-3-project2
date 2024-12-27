import dayjs from "dayjs";
import { useTimeSetterStore } from "../../store/store";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { t } from "i18next";

export default function TimeSetter() {
  const DateSet = useTimeSetterStore((state) => state.DateSet);
  const selectDate = useTimeSetterStore((state) => state.selectDate);

  const handleTimeChange = (newValue: dayjs.Dayjs | any /*임시조치*/) => {
    DateSet(newValue, newValue["$d"]);
    // $d로 오브젝트를 불러와야 하는데 $d를 쓰면 타입에러가 생김.. 하지만 정상작동하니 패쓰
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <MobileTimePicker
          sx={{
            width: 350,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c4c4c4",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c4c4c4",
                borderWidth: "2px",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7EACB5",
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#acacac",
              fontFamily: "S-CoreDream-3Light",
              marginLeft: "8px",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#7EACB5",
              marginLeft: "0px",
            },
          }}
          label={t("목표 시간 설정하기")}
          value={selectDate}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          views={["hours", "minutes", "seconds"]}
          onChange={(e) => {
            handleTimeChange(e);
          }}
          ampm={false}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
