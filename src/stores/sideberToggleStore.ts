import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarToggle {
  isToggle: boolean;
  sidebarToggle: () => void;
}

export const usesidebarToggleStore = create<SidebarToggle>()(
  persist(
    (set) => ({
      isToggle: true,
      sidebarToggle: () => set((state) => ({ isToggle: !state.isToggle })),
    }),
    {
      name: "sidebar-toggle",
    }
  )
);
