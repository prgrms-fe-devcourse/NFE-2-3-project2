import { api } from "../../api/axios";

export const deletePost = async (postId: string) => {
  try {
    await api.delete("/posts/delete", {
      data: { id: postId },
    });
  } catch (error) {
    console.error("글 삭제 도중 오류가 발생했습니다.", error);
  }
};
