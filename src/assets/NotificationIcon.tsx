import { useThemeStore } from "../store/themeStore";

export default function NotificationIcon({
  className,
  color,
  onClick,
}: IconProps) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M4 19.5V17.5H6V10.5C6 9.11667 6.41667 7.89167 7.25 6.825C8.08333 5.74167 9.16667 5.03333 10.5 4.7V4C10.5 3.58333 10.6417 3.23333 10.925 2.95C11.225 2.65 11.5833 2.5 12 2.5C12.4167 2.5 12.7667 2.65 13.05 2.95C13.35 3.23333 13.5 3.58333 13.5 4V4.7C14.8333 5.03333 15.9167 5.74167 16.75 6.825C17.5833 7.89167 18 9.11667 18 10.5V17.5H20V19.5H4ZM12 22.5C11.45 22.5 10.975 22.3083 10.575 21.925C10.1917 21.525 10 21.05 10 20.5H14C14 21.05 13.8 21.525 13.4 21.925C13.0167 22.3083 12.55 22.5 12 22.5ZM8 17.5H16V10.5C16 9.4 15.6083 8.45833 14.825 7.675C14.0417 6.89167 13.1 6.5 12 6.5C10.9 6.5 9.95833 6.89167 9.175 7.675C8.39167 8.45833 8 9.4 8 10.5V17.5Z"
        fill={color ? color : isDarkMode ? "#eeeeee" : "#222222"}
      />
    </svg>
  );
}
