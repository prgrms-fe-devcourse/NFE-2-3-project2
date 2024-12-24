import { axiosInstance } from "./axios";

interface CreateNotificationProps {
  notificationType: NotificationType;
  notificationTypeId: string;
  userId: string;
  postId?: string;
}

export const createNotification = async (body: CreateNotificationProps) => {
  try {
    const { data } = await axiosInstance.post<Post>(
      "/notifications/create",
      body
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};
