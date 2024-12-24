import { create } from "zustand";

// 내정보랑 유저정보의 타입에서 posts부분이 조금 다른게 있어서 변경했습니다 기존의 UserInfo 타입은
// UserInfo.d.ts파일에 넣어놨습니다. 확인하시고 주석지워주세요
interface MyInfo {
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: MyInfoPost[];
  likes: Like[];
  comments: string[];
  followers: string[];
  following: Following[];
  notifications: string[];
  messages: string[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  image: string;
  imagePublicId: string;
  coverImage: string;
  coverImagePublicId: string;
}

interface MyInfoPost {
  likes: {
    _id: string;
    user: string;
    post: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  comments: string[];
  _id: string;
  title: string;
  image: string;
  imagePublicId: string;
  channel: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Like {
  _id: string;
  post?: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Following {
  createdAt: string;
  follower: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

interface Auth {
  user: Partial<MyInfo> | null;
  isLoggedIn: boolean | null;
  login: () => void;
  logout: () => void;
  setUser: (u: Partial<MyInfo> | null) => void;
}

export const useAuth = create<Auth>((set) => ({
  user: null,
  isLoggedIn: null,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false, user: null }),
  setUser: (u: Partial<MyInfo> | null) =>
    set((state) => ({ user: state.user ? { ...state.user, ...u } : u })),
}));
