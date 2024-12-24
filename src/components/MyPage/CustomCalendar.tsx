import moment from "moment";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import { useAuth } from "../../stores/authStore";
import { channelMapping } from "../../constants/channel";
import { useDarkModeStore } from "../../stores/darkModeStore";

// 캘린더에서 사용할 타입
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CustomCalendar() {
  const myInfo = useAuth((state) => state.user);
  const [value, onChange] = useState<Value>(new Date());
  // 데이터 필터해서 운동한날 체크
  const mark = [
    ...new Set(
      (myInfo?.posts || [])
        .filter((post) => post.channel === channelMapping.records)
        .map((post) => moment(post.createdAt).format("YYYY-MM-DD"))
    ),
  ];

  const isDark = useDarkModeStore((state) => state.isDark);

  return (
    <>
      <div className={isDark ? "dark" : ""}>
        <Calendar
          onChange={onChange}
          minDetail="year" // 10년단위 년도 숨기기
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
          // formatDay={(locale, date) => moment(date).format("D")}
          formatDay={() => ""}
          value={value}
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          className="border-b"
          formatShortWeekday={(_, date) =>
            moment(date).format("ddd").toUpperCase()
          } // SAN, MON 등으로 변경
          calendarType="gregory" // 일요일 부터 시작
          formatMonthYear={(_, date) => moment(date).format("MMMM YYYY")} // 상단 날짜 포맷 변경
          tileContent={({ date, view }) => {
            if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              return (
                <abbr
                  aria-label={`${date.getFullYear()}년 ${
                    date.getMonth() + 1
                  }월 ${date.getDate()}일`}
                  className="circle"
                >
                  {date.getDate()} {/* 날짜를 여기서 커스터마이즈 */}
                </abbr>
              );
            } else if (view === "month") {
              return (
                <abbr
                  aria-label={`${date.getFullYear()}년 ${
                    date.getMonth() + 1
                  }월 ${date.getDate()}일`}
                >
                  {date.getDate()} {/* 날짜를 여기서 커스터마이즈 */}
                </abbr>
              );
            }
          }}
          selectRange={false} // 범위 선택 비활성화
        />
      </div>
    </>
  );
}
