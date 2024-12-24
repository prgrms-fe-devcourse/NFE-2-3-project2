import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios";
import { useAuthStore } from "../store/authStore";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const fetchNotifications = async () => {
    if (!isLoggedIn) return;

    try {
      const response = await axiosInstance.get("/notifications");
      setNotifications(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };

  const markAllNotificationsAsSeen = async () => {
    if (notifications.length === 0) return;

    const firstNotificationId = notifications[0]._id;

    try {
      await axiosInstance.put("/notifications/seen", {
        id: firstNotificationId,
      });
      const updatedNotifications = await fetchNotifications();
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error marking all notifications as seen:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [isLoggedIn]);

  return {
    notifications,
    fetchNotifications,
    markAllNotificationsAsSeen,
    setNotifications,
  };
};
