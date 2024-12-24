import { Outlet } from "react-router";
import Header from "../components/rootlayout/Header";
import { useDarkModeStore } from "../stores/darkModeStore";
import darkAuthBgImg from "../assets/darkicons/darkAuthBgImg.svg";
import lightAuthBhImg from "../assets/lightAuthBgImg.svg";

export default function AuthLayout() {
  const isDark = useDarkModeStore((state) => state.isDark);

  return (
    <div className="flex flex-col w-full h-screen min-h-screen font-pretendard">
      <Header logo />
      <div className="relative flex h-full border-2 bg-[#EFF3F7] dark:bg-lightBlackDark dark:border-blackDark">
        {/* 다크 모드에서만 이미지 표시 */}
        <img
          src={!isDark ? lightAuthBhImg : darkAuthBgImg}
          className="fixed w-[300px] h-auto object-contain z-0 top-1/2 left-1/2 translate-x-[200px]"
        />

        {/* 로그인 & 회원가입 컴포넌트 */}
        <div className="rounded-[45px] w-full max-w-[400px] h-[500px] m-auto bg-white dark:bg-blackDark z-10 relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
