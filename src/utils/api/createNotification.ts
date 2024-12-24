import { api } from "../../api/axios";

export const createNotification = async (
  notificationType: string,
  notificationTypeId: string,
  userId: string,
  postId?: string | null //팔로우일 시 null
) => {
  try {
    await api.post("/notifications/create", {
      notificationType,
      notificationTypeId,
      userId,
      postId,
    });
  } catch (error) {
    console.error("알림발생 도중 오류가 발생했습니다.", error);
  }
};
