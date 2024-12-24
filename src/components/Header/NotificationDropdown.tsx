import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { getOnePost } from "../../api/post";
import { useNotifications } from "../../hooks/useNotification";

export default function NotificationDropdown({
  onAllNotificationsSeen,
}: {
  onAllNotificationsSeen?: () => void;
}) {
  const { notifications, markAllNotificationsAsSeen } = useNotifications();
  const [notificationLinks, setNotificationLinks] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const updateLinks = async () => {
      const linksArray = await Promise.all(
        notifications.map(async (notification) => {
          const link = await getNotificationLink(notification);
          return { [notification._id]: link };
        })
      );

      const links = Object.assign({}, ...linksArray);
      setNotificationLinks(links);
    };

    updateLinks();
  }, [notifications]);

  const handleMarkAllAsSeen = async () => {
    await markAllNotificationsAsSeen();
    // 부모 컴포넌트에 알림이 모두 읽음 처리되었음을 알림
    onAllNotificationsSeen?.();
  };

  const getNotificationLink = async (notification: Notification) => {
    if (notification.follow) {
      return `/user/${notification.author?._id}`;
    }

    if (notification.like || notification.comment) {
      if (!notification.post) {
        console.error("Post ID is missing in the notification.");
        return "#";
      }

      try {
        const post = await getOnePost(notification.post);
        return `/channels/${post?.channel.name}/${notification.post}`;
      } catch (error) {
        console.error("Error fetching post channel name:", error);
        return "#";
      }
    }

    if (notification.message) {
      return `/message?user=${notification.author?._id}`;
    }

    return "#";
  };

  const getNotificationText = (notification: Notification) => {
    const authorName = notification.author?.fullName || "익명";

    if (notification.follow) {
      return `${authorName}님이 팔로잉했습니다.`;
    }

    if (notification.like) {
      return `${authorName}님이 내 포스트에 좋아요를 눌렀습니다.`;
    }

    if (notification.comment) {
      return `${authorName}님이 내 포스트에 댓글을 달았습니다.`;
    }

    if (notification.message) {
      return `${authorName}님으로부터 메시지가 도착했습니다.`;
    }

    return "새로운 알림";
  };

  return (
    <div className="absolute px-8 py-3 left-0 top-11 w-[364px] z-40 bg-white dark:bg-gray-22 border dark:border-gray-ee/50 rounded-lg">
      <div className="flex justify-between items-center border-b border-gray-22 dark:border-gray-ee/50 py-2 mb-2.5">
        <p>알림</p>
        {notifications.length > 0 && (
          <button
            onClick={handleMarkAllAsSeen}
            className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-ee"
          >
            모두 읽음
          </button>
        )}
      </div>
      <ul className="flex flex-col gap-1 max-h-64 overflow-y-auto custom-scrollbar">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li
              key={notification._id}
              className={`rounded-lg relative ${
                notification.seen ? "text-gray-c8" : ""
              } hover:bg-secondary dark:hover:text-gray-22`}
              onClick={() => {
                // 조건부로 handleMarkAllAsSeen 실행
                if (!notification.seen) {
                  handleMarkAllAsSeen();
                }
              }}
            >
              <NavLink
                className="block px-7 py-3"
                to={notificationLinks[notification._id] || "#"}
              >
                {/* 알림 텍스트 */}
                {getNotificationText(notification)}
              </NavLink>
            </li>
          ))
        ) : (
          <li className="px-7 py-3 text-center text-gray-54 dark:text-gray-c8">
            아직 새로운 알림이 없어요...
          </li>
        )}
      </ul>
    </div>
  );
}
