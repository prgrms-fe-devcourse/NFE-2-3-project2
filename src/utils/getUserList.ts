import { api } from "../api/axios";

export interface UserListType {
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: string[];
  likes: string[];
  comments: string[];
  followers: string[];
  following: string[];
  notifications: string[];
  messages: string[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  __v: number;
  image?: string;
  imagePublicId?: string;
  coverImage?: string;
  coverImagePublicId?: string;
}

export const getUserList = async () => {
  try {
    const { data } = await api.get("/users/get-users");
    const userListData: UserListType[] = data;

    return userListData;
  } catch (err) {
    console.log(err);
  }
};
