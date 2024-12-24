import { useState } from "react";
import ChannelList from "../ChannelList";
import UserListModal from "../userlistModal/UserListModal";
import UserProfile from "../UserProfile";
import { twMerge } from "tailwind-merge";
import { usesidebarToggleStore } from "../../stores/sideberToggleStore";
// 아이콘
import MainLogo from "../../assets/loge.svg";
import dumbbell from "../../assets/dumbbell_icon.svg";
import protein from "../../assets/protein_icon.svg";
import routine from "../../assets/routine_icon.svg";
import gym from "../../assets/gym_icon.svg";
import left from "../../assets/double-left.svg";
import right from "../../assets/double-right.svg";
import user from "../../assets/user_icon.svg";
import { useAuth } from "../../stores/authStore";
import CheckDone from "../checkDone/CheckDone";
import { Link, useNavigate } from "react-router";
import { useDarkModeStore } from "../../stores/darkModeStore";

// 다크모드 아이콘
import MainDarkLogo from "../../assets/darkicons/darkMainLogo.svg";
import darkDumbellLogo from "../../assets/darkicons/darkCheckLogo.svg";
import darkProteinLogo from "../../assets/darkicons/darkProteinLogo.svg";
import darkRoutineLogo from "../../assets/darkicons/darkRoutineLogo.svg";
import darkGymLogo from "../../assets/darkicons/darkGymLogo.svg";
import darkLeft from "../../assets/darkicons/darkLeftIcon.svg";
import darkRight from "../../assets/darkicons/darkRightIcon.svg";
import darkUserListIcon from "../../assets/darkicons/darkUserListIcon.svg";

interface SidebarType {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ setIsModalOpen }: SidebarType) {
  const isDark = useDarkModeStore((state) => state.isDark);
  const navigate = useNavigate();

  //로그인상태
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  // 유저정보
  const userInfo = useAuth((state) => state.user);
  // 유저 목록 모달 상태
  const [isOpen, setIsOpen] = useState(false);
  // 사이드바 토글 상태
  const isToggle = usesidebarToggleStore((state) => state.isToggle);
  const sidebarToggle = usesidebarToggleStore((state) => state.sidebarToggle);

  const handleToggleClick = () => {
    sidebarToggle();
  };

  const handleBackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsModalOpen(false);
  };

  const channel = [
    {
      id: 1,
      title: "오운완 인증",
      icon: !isDark ? dumbbell : darkDumbellLogo,
      alt: "오운완 아이콘",
      route: "/records",
    },
    {
      id: 2,
      title: "프로틴 추천",
      icon: !isDark ? protein : darkProteinLogo,
      alt: "프로틴 아이콘",
      route: "protein",
    },
    {
      id: 3,
      title: "식단 공유",
      icon: !isDark ? routine : darkRoutineLogo,
      alt: "식단 아이콘",
      route: "routine",
    },
    {
      id: 4,
      title: "헬스장 후기",
      icon: !isDark ? gym : darkGymLogo,
      alt: "헬스장 아이콘",
      route: "gymreview",
    },
  ];

  return (
    <div
      className={twMerge(
        `flex flex-col items-center gap-1 h-[100vh] z-10
      py-5 text-[#1D1D1D] bg-[#FEFEFE] border-r
      border-gray-200/50 fixed transition-[width] dark:bg-[#2C2C2C] dark:border-darkGreyDark`,
        isOpen ? (!isDark ? "before:modal-back" : "before:darkModal-back") : "",
        isToggle ? "w-[300px]" : "w-20"
      )}
      onClick={(e) => handleBackClick(e)}
    >
      {/* 토글 버튼 */}
      <button
        onClick={handleToggleClick}
        className={twMerge(
          "self-end w-10 mr-2 hover:brightness-95 dark:hover:brightness-75 transition-all",
          !isToggle && "m-auto"
        )}
      >
        {!isDark ? (
          <img src={isToggle ? left : right} alt="토글버튼" />
        ) : (
          <img src={isToggle ? darkLeft : darkRight} alt="토글버튼" />
        )}
      </button>
      {/* 로고 */}
      <Link
        className={twMerge("w-20 h-[53px] mb-[14px]", !isToggle && "hidden")}
        to="/"
      >
        {!isDark ? (
          <img src={MainLogo} alt="loge" />
        ) : (
          <img src={MainDarkLogo} alt="다크모드 로고" />
        )}
      </Link>

      <div
        className={twMerge(
          "flex flex-col gap-[10px] ",
          isToggle ? "min-h-[295px]" : "h-0"
        )}
      >
        {isLoggedIn === null ? null : (
          <>
            {/* 멘트 */}
            <div className="flex flex-col items-center gap-[10px] pb-[15px] w-full text-lg font-medium dark:text-[#EDEDED] ">
              <div
                className={twMerge(
                  "flex flex-col items-center text-center mt-2",
                  !isToggle && "hidden"
                )}
              >
                <div>
                  어서오세요{" "}
                  <span className="text-[#265CAC] dark:text-[#6FBEFF] text-[19px] font-bold">
                    {userInfo && isLoggedIn ? userInfo.fullName : "회원"}
                  </span>
                  님
                </div>
                <div>오늘도 운동 완료하셨나요?</div>
              </div>
              {/* 유저 프로필 */}
              {isToggle && (
                <UserProfile
                  BackWidth="w-[100px]"
                  BackHeight="h-[100px]"
                  onClick={
                    isLoggedIn ? () => navigate("/myprofile") : undefined
                  }
                  userImg={userInfo?.image}
                  myProfile={isLoggedIn} //로그인 여부에 따라 홈 아이콘 표시
                />
              )}
            </div>

            {/* 한달 운동 횟수 */}
            {isToggle ? (
              <CheckDone textSize="text-[16px]" width="w-[65px]" />
            ) : null}
          </>
        )}
      </div>

      <div
        className={twMerge(
          "flex flex-col justify-between w-full h-full border-t dark:border-darkGreyDark ",
          !isToggle && "border-t-0"
        )}
      >
        {/* 채널목록 */}
        <div className="w-full">
          <ul className="flex flex-col w-full gap-2 p-1">
            {channel.map((item) => {
              return (
                <ChannelList
                  icon={item.icon}
                  alt={item.alt}
                  route={item.route}
                  key={item.id}
                  toggleStyle={isToggle ? "" : "p-0 justify-center"}
                  isToggleOpen={isToggle}
                >
                  {item.title}
                </ChannelList>
              );
            })}
          </ul>
        </div>
        <div className="items-center ">
          {/* 유저목록 버튼 */}
          <div className="flex justify-center">
            <button
              className={twMerge(
                "mt-2 self-center w-[230px] h-[40px] bg-[#265CAC] hover:bg-[#1e4d8a] rounded-[15px] text-base text-white font-medium relative dark:bg-mainDark dark:text-blackDark dark:hover:bg-mainTextDark",
                !isToggle && "hidden"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => !prev);
                setIsModalOpen(true);
              }}
            >
              유저 목록
            </button>
            <button className={twMerge("mt-6", isToggle && "hidden")}>
              <img
                src={!isDark ? user : darkUserListIcon}
                alt="유저아이콘"
                className={twMerge("self-center m-auto")}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen((prev) => !prev);
                  setIsModalOpen(true);
                }}
              />
            </button>
          </div>
        </div>

        {isOpen && (
          <UserListModal
            handleBackClick={handleBackClick}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
}
