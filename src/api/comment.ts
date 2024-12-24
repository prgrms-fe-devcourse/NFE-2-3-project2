import { axiosInstance } from "./axios";

interface CreateCommentProps {
  comment: string;
  postId?: string;
}

interface DeleteCommentProps {
  id: string;
}

export const createComment = async (body: CreateCommentProps) => {
  try {
    if (!body.postId) throw new Error("/postId가 undefined입니다!");

    const { data } = await axiosInstance.post<Comment>(
      "/comments/create",
      body
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteComment = async (body: DeleteCommentProps) => {
  try {
    if (!body.id) throw new Error("/commentId가 undefined입니다!");

    const response = await axiosInstance.delete<Comment>("/comments/delete", {
      data: body,
    });
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};
