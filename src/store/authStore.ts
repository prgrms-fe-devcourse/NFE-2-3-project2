import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: User | null;
  checkIsMyUserId: (id: string) => boolean;
  login: (accessToken: string, user: User) => void;
  logout: () => void;
  getMyInfo: () => User | null;
  updateUser: (user: User) => void;
  updateUserImage: (image: string) => void;
  updateUserFullName: (fullName: string) => void;
  deleteFollowing: (followId: string) => void;
  addFollowing: (followInfo: Follow) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      accessToken: null,
      user: null,
      checkIsMyUserId: (id) => id === get().user?._id,
      login: (accessToken: string, user: User) =>
        set({ isLoggedIn: true, accessToken, user }),
      logout: () => {
        set({ isLoggedIn: false, accessToken: null, user: null });
        window.dispatchEvent(new CustomEvent("logout"));
      },
      getMyInfo: () => get().user,
      updateUser: (user: User) =>
        set((state) => ({
          ...state,
          user,
        })),
      updateUserImage: (image: string) =>
        set((state) => ({
          user: state.user ? { ...state.user, image } : null,
        })),
      updateUserFullName: (fullName: string) =>
        set((state) => ({
          user: state.user ? { ...state.user, fullName } : null,
        })),
      deleteFollowing: (followId: string) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                following: state.user.following.filter(
                  ({ _id }) => _id !== followId
                ),
              }
            : null,
        })),
      addFollowing: (followInfo: Follow) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                following: [...state.user.following, followInfo],
              }
            : null,
        })),
    }),
    {
      name: "auth", // localStorage에 저장될 key 이름
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
        user: state.user,
      }), // 필요한 상태만 저장
    }
  )
);
