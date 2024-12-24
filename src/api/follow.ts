import { useAuthStore } from "../store/authStore";
import { axiosInstance } from "./axios";

export const postFollow = async (userId: string) => {
  const addFollowing = useAuthStore.getState().addFollowing;
  try {
    const { data } = await axiosInstance.post<Follow>("/follow/create", {
      userId,
    });
    addFollowing(data);
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteFollow = async (followId: string) => {
  const deleteFollowing = useAuthStore.getState().deleteFollowing;
  try {
    await axiosInstance.delete("/follow/delete", {
      data: {
        id: followId,
      },
    });
    deleteFollowing(followId);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
