import { create } from "zustand";
import { getAllUsers } from "../api/user";

interface AllUserStore {
  users: User[];
  fetchUsers: () => Promise<void>;
  getUser: (id: string) => Promise<User | undefined>;
  getUsers: () => Promise<User[]>;
}

export const useAllUserStore = create<AllUserStore>((set, get, api) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const data = await getAllUsers();
      data?.sort((a) => (a.isOnline ? -1 : 1));
      set({ users: data ?? [] });
    } catch (err) {
      console.error(err);
    }
  },
  getUser: async (id: string) => {
    if (get().users.length === 0) {
      await new Promise<void>((resolve) => {
        const unsubscribe = api.subscribe((state) => {
          const users: User[] = state.users;
          if (users.length > 0) {
            unsubscribe();
            resolve();
          }
        });
      });
    }
    return get().users.find((user) => user._id === id);
  },
  getUsers: async () => {
    if (get().users.length === 0) {
      await new Promise<void>((resolve) => {
        const unsubscribe = api.subscribe((state) => {
          const users: User[] = state.users;
          if (users.length > 0) {
            unsubscribe();
            resolve();
          }
        });
      });
    }
    return get().users;
  },
}));
