import { useEffect, useState } from "react";
import { useAuth } from "../../stores/authStore";
import CheckDoneMonth from "./CheckDoneMonth";
import DoneProgressBar from "./DoneProgressBar";
import { channelMapping } from "../../constants/channel";
import moment from "moment";

interface CheckDoneType {
  width?: string;
  textSize?: string;
  bg?: string;
}

export default function CheckDone({ width, textSize, bg }: CheckDoneType) {
  const myInfo = useAuth((state) => state.user);

  const [checkNumber, setCheckNumber] = useState(0);

  useEffect(() => {
    // if (!myInfo || !myInfo.posts) return;

    const mark = [
      ...new Set(
        (myInfo?.posts || [])
          .filter((post) => post.channel === channelMapping.records)
          .map((post) => moment(post.createdAt).format("YYYY-MM-DD"))
      ),
    ];

    setCheckNumber(mark.length);
  }, [myInfo]);

  return (
    <div
      className={`flex justify-center items-center gap-[20px] ${
        bg ? bg : ""
      } p-3 ${bg && "w-[380px] h-[188px] rounded-[10px]"}`}
    >
      <DoneProgressBar checkNumber={checkNumber} width={width} />
      <CheckDoneMonth checkNumber={checkNumber} textSize={textSize} />
    </div>
  );
}
