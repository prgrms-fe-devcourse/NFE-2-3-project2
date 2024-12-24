import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDarkModeStore } from "../../stores/darkModeStore";

interface DoneProgressBar {
  checkNumber: number;
  width?: string;
}

export default function DoneProgressBar({
  checkNumber,
  width,
}: DoneProgressBar) {
  const date = new Date();

  const setDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  // 해당 월의 마지막 날짜
  const lastDate = setDate.getDate();

  // 해당 월의 게시글을 작성한 평균
  const percent = (checkNumber / lastDate) * 100;

  const isDark = useDarkModeStore((state) => state.isDark);

  const textFill = isDark ? "#6FBEFF" : "#265CAC";
  const circleFill = isDark ? "#252525" : "#ececec";
  const circleDoneFill = isDark
    ? `rgba(129, 180, 221, 100)`
    : `rgba(38, 92, 172, 100)`;

  return (
    <div className={`${width ? width : "w-[110px]"}`}>
      <CircularProgressbar
        value={percent}
        text={`${percent.toFixed(0)}%`}
        styles={{
          path: {
            stroke: circleDoneFill,
            strokeLinecap: "round",
            transition: "stroke-dashoffset 0.5s ease 0s",
          },
          trail: {
            stroke: circleFill,
          },
          text: {
            fill: textFill,
          },
        }}
      />
    </div>
  );
}
