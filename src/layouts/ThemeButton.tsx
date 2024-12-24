import { useLayoutEffect } from "react";
import { THEME } from "../constants/theme";
import { useThemeStore } from "../store/themeStore";
import LightModeIcon from "../assets/LightModeIcon";
import DarkModeIcon from "../assets/DarkModeIcon";

export default function ThemeButton() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useLayoutEffect(() => {
    applyThemePreference();
  }, [isDarkMode]);

  const applyThemePreference = () => {
    const root = document.documentElement;
    root.classList.toggle(THEME.DARK, isDarkMode);
    root.classList.toggle(THEME.LIGHT, !isDarkMode);
  };

  return (
    <button
      type="button"
      className="flex justify-center items-center w-12 h-12 fixed bottom-10 right-10 bg-secondary rounded-full"
      onClick={toggleTheme}
    >
      {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
    </button>
  );
}
