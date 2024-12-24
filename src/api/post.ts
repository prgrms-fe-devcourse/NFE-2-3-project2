import { axiosInstance } from "./axios";

interface CreatePostProps {
  title: string;
  channelId: string;
}
export const createPost = async (body: CreatePostProps) => {
  try {
    const { data } = await axiosInstance.post<Post>("/posts/create", body);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getOnePost = async (postId?: string) => {
  try {
    if (!postId) throw new Error("postId가 undefined입니다!");

    const { data } = await axiosInstance.get<Post>(`/posts/${postId}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getChannelPosts = async (channelId: string) => {
  try {
    const { data } = await axiosInstance.get<Post[]>(
      `/posts/channel/${channelId}`
    );
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

interface UpdatePostProps {
  postId: string;
  title: string;
  imageToDeletePublicId?: string;
  channelId: string;
}
export const updatePost = async (body: UpdatePostProps) => {
  try {
    const { data } = await axiosInstance.put<Post>("/posts/update", body);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete<Post>("/posts/delete", {
      data: { id },
    });
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
