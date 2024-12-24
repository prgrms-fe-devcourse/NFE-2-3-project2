import { axiosInstance } from "./axios";

export const postLike = async (postId: string) => {
  try {
    const { data } = await axiosInstance.post<Like>("/likes/create", {
      postId,
    });
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteLike = async (likeId: string) => {
  try {
    await axiosInstance.delete("/likes/delete", {
      data: {
        id: likeId,
      },
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
