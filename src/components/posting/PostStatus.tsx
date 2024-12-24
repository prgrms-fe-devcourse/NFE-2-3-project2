import uploadImgIcon from "../../assets/uploadImgIcon.svg";
import selectChannel from "../../assets/selectChannel.svg";
import writeTitle from "../../assets/writeTitle.svg";
import { useDarkModeStore } from "../../stores/darkModeStore";
import darkUploadImgIcon from "../../assets/darkicons/darkUploadImgIcon.svg";
import darkSelectChannel from "../../assets/darkicons/darkSelectChannel.svg";
import darkWriteTitle from "../../assets/darkicons/darkWriteTitle.svg";

interface PostStatusProps {
  img: string;
  title: string;
  desc: string;
  channel: string;
}

export default function PostStatus({
  img,
  title,
  desc,
  channel,
}: PostStatusProps) {
  const isTitleValid = title.trim() !== "";
  const isDescValid = desc.trim() !== "";

  const isDark = useDarkModeStore((state) => state.isDark);
  const IconDone = isDark ? "bg-mainDark" : "bg-[#4CAF50] ";
  const IconUndo = isDark ? "bg-semiDarkGreyDark" : "bg-[#c1c1c1]";
  const textDone = isDark ? "text-mainDark" : "text-[#4CAF50] ";
  const textUndo = isDark ? "text-semiDarkGreyDark" : "text-[#c1c1c1]";

  return (
    <div className="w-[250px] h-[45px] flex items-center justify-between border-t border-[#c1c1c1] mt-3 text-sm">
      {/* 아이콘 */}
      <div
        className={`w-[45px] flex flex-col justify-center items-center gap-2`}
      >
        <div
          className={`w-[45px] h-[45px] rounded-[50%] ${
            img ? IconDone : IconUndo
          } flex justify-center items-center `}
        >
          <img
            src={!isDark ? uploadImgIcon : darkUploadImgIcon}
            alt="이미지 업로드 아이콘"
            className="w-[30px] h-[30px] block "
          />
        </div>
        <p
          className={`${img ? textDone : textUndo} text-center leading-[16px]`}
        >
          이미지
          <br />
          등록
        </p>
      </div>

      <div
        className={`w-[45px] flex flex-col justify-center items-center gap-2`}
      >
        <div
          className={`w-[45px] h-[45px] rounded-[50%] ${
            channel !== "게시판 선택" ? IconDone : IconUndo
          } flex justify-center items-center`}
        >
          <img
            src={!isDark ? selectChannel : darkSelectChannel}
            alt="게시판 아이콘"
            className="w-[30px] h-[30px] block"
          />
        </div>
        <p
          className={`${
            channel !== "게시판 선택" ? textDone : textUndo
          } text-center leading-[16px]`}
        >
          게시판
          <br />
          선택
        </p>
      </div>

      <div
        className={`w-[45px] flex flex-col justify-center items-center gap-2`}
      >
        <div
          className={`w-[45px] h-[45px] rounded-[50%] ${
            isTitleValid && isDescValid ? IconDone : IconUndo
          } flex justify-center items-center`}
        >
          <img
            src={!isDark ? writeTitle : darkWriteTitle}
            alt="작성 아이콘"
            className="w-[30px] h-[30px] block ml-[6px]"
          />
        </div>
        <p
          className={`${
            isTitleValid && isDescValid ? textDone : textUndo
          } text-center leading-[16px]`}
        >
          내용
          <br />
          작성
        </p>
      </div>
    </div>
  );
}
