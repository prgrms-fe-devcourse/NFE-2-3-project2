import { Link } from "react-router";
import images from "../../assets";
import { useState, useEffect, useCallback } from "react";
import {
  NotiType,
  getNotification,
  putNotificationSeen,
} from "../../api/notification";
import NotiItem from "../ui/NotiItem";
import Avata from "../common/Avata";
import { useTriggerStore } from "../../stores/triggerStore";
export default function AfterUserBox({ user }: { user: User }) {
  const trigger = useTriggerStore((state) => state.trigger);
  const setTrigger = useTriggerStore((state) => state.setTrigger);
  const [notis, setNotis] = useState<NotiType[]>([]);

  useEffect(() => {
    const handleGetNotis = async () => {
      const data = await getNotification();
      const now = new Date().getTime(); // 현재 시간
      const fiveMinutesInMs = 5 * 60 * 1000; // 5분을 밀리초로 변환
      const filter = data.filter((item) => {
        if (!item.seen) return true; // seen이 false인 경우 유지
        if (item.seen) {
          const updatedAt = new Date(item.updatedAt).getTime();
          return now - updatedAt <= fiveMinutesInMs; // 5분 이내인지 확인
        }
        return false; // 그 외는 필터링
      });
      setNotis(filter);
    };
    handleGetNotis();
  }, [trigger]);

  const handleClickNotiSeen = useCallback(async () => {
    if (!notis.length) return;
    await putNotificationSeen();
    setTrigger();
  }, [notis]);

  return (
    <div className="flex flex-col gap-5">
      <div className="pb-5 border-b border-whiteDark dark:border-gray">
        <div className="flex justify-end">
          <Link to={"/user/edit"}>
            <img
              className="dark:invert"
              src={images.Setting}
              alt="setting icon"
            />
          </Link>
        </div>
        <Link to={`/user/${user._id}`} className="flex gap-[10px] items-center">
          <Avata profile={user.image} size={"sm"} />
          <div>
            <h3 className="text-sm font-bold line-clamp-1 text-black dark:text-white">
              {user.fullName}
            </h3>
            <p className="text-xs text-gray dark:text-whiteDark">
              {user.email}
            </p>
          </div>
        </Link>
      </div>
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-bold">알림</h2>
          <button
            onClick={handleClickNotiSeen}
            className="text-xs hover:underline"
          >
            모두 읽음
          </button>
        </div>
        <div className="flex-1 max-h-[20vh] scroll overflow-y-auto ">
          <ul className="flex flex-col gap-[1px] text-xs">
            {notis.length ? (
              <>
                {notis.map((noti) => (
                  <NotiItem key={noti._id} active={!noti.seen} noti={noti} />
                ))}
              </>
            ) : (
              <li className="text-gray dark:text-whiteDark">
                등록된 알림이 없습니다
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
