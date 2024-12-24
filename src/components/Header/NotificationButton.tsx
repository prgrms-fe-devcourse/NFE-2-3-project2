import { useEffect, useRef, useState } from "react";
import NotificationIcon from "../../assets/NotificationIcon";
import NotificationDropdown from "./NotificationDropdown";
import { useNotifications } from "../../hooks/useNotification";

export default function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // useNotifications에서 가져올 상태 및 함수
  const { notifications, fetchNotifications, markAllNotificationsAsSeen } =
    useNotifications();
  const [hasNotifications, setHasNotifications] = useState(false);

  // 알림의 'seen' 상태를 확인하여 빨간 점 여부를 설정
  useEffect(() => {
    setHasNotifications(notifications.some((n) => !n.seen));
  }, [notifications]);

  // 모두 읽음 버튼 클릭 시
  const handleAllSeen = async () => {
    await markAllNotificationsAsSeen();
    await fetchNotifications(); // 서버와 동기화해서 알림 상태 업데이트
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // 외부 클릭 시 드롭다운 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // 클릭 이벤트 추가
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // 이벤트 해제
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button className="flex items-center justify-center w-[36px] h-[36px] rounded-full hover:bg-secondary dark:hover:bg-white/20 transition-all duration-300 ease-in-out">
        <NotificationIcon
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-[24px] h-[24px]"
        />
        {hasNotifications && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        )}
      </button>
      {isOpen && (
        <NotificationDropdown onAllNotificationsSeen={handleAllSeen} />
      )}
    </div>
  );
}
