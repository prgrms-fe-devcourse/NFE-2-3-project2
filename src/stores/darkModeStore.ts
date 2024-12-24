import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DarkModeStore {
  isDark: boolean;
  toggleDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeStore>()(
  persist(
    (set, get) => ({
      isDark: false,
      toggleDarkMode: () => set(() => ({ isDark: !get().isDark })),
    }),
    {
      name: "darkModeStorage",
    }
  )
);
