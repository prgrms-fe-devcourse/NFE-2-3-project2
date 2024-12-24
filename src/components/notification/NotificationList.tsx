import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCourseObj } from "../../api/postApi";
import defaultProfile from "../../assets/images/exProfileImg.svg";
import { useNotificationStore } from "../../stores/notificationStore";

type NotificationType = "COMMENT" | "LIKE" | "FOLLOW" | "NULL";

//TODO: Memoization 사용하기
export default function NotificationList() {
  const notifications = useNotificationStore((state) => state.notifications);
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications
  );
  const change2Seen = useNotificationStore((state) => state.change2Seen);
  const stopNotification = useNotificationStore(
    (state) => state.stopNotification
  );
  const [courseTitles, setCourseTitles] = useState<{ [key: string]: string }>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        // 상태 업데이트
        fetchNotifications();
        const titleMap: { [key: string]: string } = {};
        await Promise.all(
          useNotificationStore.getState().notifications.map(async (item) => {
            const post = (await getCourseObj(item.post)) as Course;
            if (post) {
              const titleData: TitleObj = JSON.parse(post.title);
              console.log("titleData", titleData);
              titleMap[item.post] = titleData.courseTitle || "제목이 없습니다";
            } else {
              titleMap[item.post] = "No title";
            }
          })
        );
        setCourseTitles(titleMap);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [notifications]);

  // 알림 클릭시 페이지 이동
  const clickNotification = async (
    notificationId: string,
    notificationType: NotificationType,
    postId: string,
    otherUserId: string
  ) => {
    try {
      change2Seen(notificationId);
      if (notificationType === "COMMENT" || notificationType === "LIKE") {
        navigate(`/course-content/${postId}`);
      } else if (notificationType === "FOLLOW") {
        navigate(`/other-user-info/${otherUserId}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      if (notificationType === "COMMENT" || notificationType === "LIKE") {
        alert("게시글을 찾을 수 없습니다.");
      } else if (notificationType === "FOLLOW") {
        alert("사용자를 찾을 수 없습니다.");
        navigate("/");
      }
    }
  };

  const checkNotificationType = (data: Notification): NotificationType => {
    if (data.follow) return "FOLLOW";
    else if (data.like) return "LIKE";
    else if (data.comment) return "COMMENT";
    change2Seen(data._id);
    return "NULL";
  };

  //TODO
  if (loading) return <></>;
  else if (error) {
    stopNotification();
    return <p>에러 발생: {error}</p>;
  } else
    return (
      <div>
        {notifications.map((item) => {
          const notificationType = checkNotificationType(item);
          let notificationText = "";
          switch (notificationType) {
            case "LIKE":
              notificationText = `${item.author.fullName}님이 ${
                courseTitles[item.post] || "로딩 중..."
              } 포스트에 좋아요를 눌렀습니다.`;
              break;
            case "FOLLOW":
              notificationText = `${item.author.fullName}님이 회원님을 팔로우 합니다.`;
              break;
            case "COMMENT":
              notificationText = `${item.author.fullName}님이 ${
                courseTitles[item.post] || "로딩 중..."
              } 포스트에 댓글을 남겼습니다.`;
              break;
          }

          return (
            <div
              key={item._id}
              className={`w-[528px] min-h-[64px] items-center p-4 rounded-[15px] text-base text-custom-black bg-white shadow-default m-[10px] hover:scale-105 hover:opacity-100 hover:cursor-pointer relative z-10 ${
                notificationType === "NULL" ? "hidden" : "flex"
              }`}
              onClick={() =>
                clickNotification(
                  item._id,
                  notificationType,
                  item.post,
                  item.author._id
                )
              }
            >
              <div className="flex flex-row items-center">
                <img
                  src={item.author.image || defaultProfile}
                  className="w-[30px] h-[30px] bg-custom-gray/25 rounded-full mr-3"
                />
                <p className="font-medium text-custom-black">
                  {notificationText}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
}
