import { useAuth } from "../../stores/authStore";

interface CheckDoneMonthType {
  checkNumber: number;
  width?: string;
  textSize?: string;
}

export default function CheckDoneMonth({
  checkNumber,
  textSize,
}: CheckDoneMonthType) {
  const myInfo = useAuth((state) => state.user);

  const date = new Date();
  return (
    <div className={`${textSize ? textSize : "text-[18px]"} dark:text-[#fff]`}>
      <p className={`${textSize ? textSize : "text-[18px]"} font-medium `}>
        {myInfo?.fullName || "회원"}님
      </p>
      <p
        className={`text-[#265CAC] dark:text-[#6FBEFF] ${
          textSize ? textSize : "text-[20px]"
        } font-bold `}
      >
        {date.getMonth() + 1}월달에 총 {checkNumber}회
      </p>
      인증하셨네요
    </div>
  );
}
