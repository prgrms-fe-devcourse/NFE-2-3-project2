import { useThemeStore } from "../store/themeStore";

export default function SearchIcon({ className, color }: IconProps) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return (
    <svg
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="Icons/16px/Search">
        <path
          id="Combined Shape"
          d="M21.1846 19.1616C21.6051 19.5821 21.6051 20.264 21.1846 20.6846C20.764 21.1051 20.0821 21.1051 19.6616 20.6846L15.8923 16.9153C15.4718 16.4948 15.4718 15.8129 15.8923 15.3923C16.3129 14.9718 16.9948 14.9718 17.4153 15.3923L21.1846 19.1616ZM9.11539 17.2308C4.35724 17.2308 0.5 13.3735 0.5 8.61539C0.5 3.85724 4.35724 0 9.11539 0C13.8735 0 17.7308 3.85724 17.7308 8.61539C17.7308 13.3735 13.8735 17.2308 9.11539 17.2308ZM9.11539 15.0769C12.684 15.0769 15.5769 12.184 15.5769 8.61539C15.5769 5.04678 12.684 2.15385 9.11539 2.15385C5.54678 2.15385 2.65385 5.04678 2.65385 8.61539C2.65385 12.184 5.54678 15.0769 9.11539 15.0769Z"
          fill={color ? color : isDarkMode ? "#eeeeee" : "#222222"}
        />
      </g>
    </svg>
  );
}
