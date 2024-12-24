import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import horizontalAfternoon from "../../assets/horizontalAfternoon.svg";
import horizontalNight from "../../assets/horizontalNight.svg";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import innercircle from "../../assets/innercircle.svg";
import { useDarkModeStore } from "../../stores/darkModeStore";

export default function ModeChange() {
  // 다크모드
  const isDark = useDarkModeStore((state) => state.isDark);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  const handleClick = () => {
    toggleDarkMode();
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div className="flex items-center justify-center">
      {/* 다크모드 버튼 */}
      <button
        onClick={handleClick}
        className={twMerge(
          "relative w-[63px] h-[30px] dark:border dark:border-semiDarkGreyDark rounded-full text-white font-bold text-[16px] overflow-hidden group shadow-inner"
        )}
        style={{
          backgroundImage: isDark
            ? `url(${horizontalNight})`
            : `url(${horizontalAfternoon})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={isDark ? moon : sun}
          alt="circleHorizontal"
          className={twMerge(
            `absolute w-[18px] h-[18x] rounded-full transition-all duration-300 ease-in-out translate-y-[5.5px] ${
              isDark ? "translate-x-[8px]" : "translate-x-[34px]"
            } mt-[-15px] top-[50%] group-hover:scale-110`
          )}
        />
        <img
          src={innercircle}
          alt="innercircle"
          className={twMerge(
            `absolute w-[25px] h-[25x] rounded-full transition-all duration-300 ease-in-out translate-y-[3.3px] ${
              isDark ? "translate-x-[36px]" : "translate-x-[2px]"
            } mt-[-15px] top-[50%]`
          )}
        />
      </button>
    </div>
  );
}
