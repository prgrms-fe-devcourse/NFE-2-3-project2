import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WeekArtistStore {
  weekArtists: User[];
  pickWeekArtists: (users: User[]) => void;
  pickedDate: string;
}

export const useWeekArtistStore = create<WeekArtistStore>()(
  persist(
    (set) => ({
      weekArtists: [],
      pickWeekArtists: (users) => {
        const candidates = users.filter(
          (user) => user.role !== "SuperAdmin" && user.posts.length > 0
        );
        const shuffled = candidates.sort(() => 0.5 - Math.random());
        const weekArtists = shuffled.slice(0, 5);
        set({ weekArtists, pickedDate: new Date().toISOString() });
      },
      pickedDate: "",
    }),
    {
      name: "weekArtists",
    }
  )
);
