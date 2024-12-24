import ButtonComponent from "../ButtonComponent";
import likeIcon from "../../assets/noti_like_Icon.svg";
import followIcon from "../../assets/noti_follow_Icon.svg";
import commentIcon from "../../assets/icons/Comment_Icon.svg";
import action_comment from "../../assets/icons/action_comment.svg";
import action_noti_follow from "../../assets/icons/action_noti_follow.svg";
import action_noti_like from "../../assets/icons/action_noti_like.svg";

import NotificationBox from "../NotificationBox";
import { api } from "../../api/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

// import darkCommentIcon from "../../assets/darkicons/darkCommentIcon.svg";
// import darkFollowIcon from "../../assets/darkicons/darkFollowIcon.svg";
// import darkLikeIcon from "../../assets/darkicons/darkLikeIcon.svg";
// import { useDarkModeStore } from "../../stores/darkModeStore";
import { useAuth } from "../../stores/authStore";
import { twMerge } from "tailwind-merge";

interface notificationProps {
  closeNoti: () => void;
  notificationArray?: any;
}

export interface notificationType {
  seen: boolean;
  _id: string;
  author: {
    role: string;
    emailVerified: boolean;
    banned: boolean;
    isOnline: boolean;
    posts: string[];
    likes: string[];
    comments: string[];
    followers: string[];
    following: string[];
    notifications: string[];
    messages: [];
    _id: string;
    fullName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    username: null;
    image: string;
    imagePublicId: string;
  };
  user: string;
  post: string;
  follow?: string;
  comment?: string[] | null | undefined;
  like?: null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API보고 notificationArray 받아서 처리하자
export default function Notification({
  closeNoti,
  notificationArray,
}: notificationProps) {
  // 모두읽음처리
  const notificationSeen = async () => {
    try {
      // 전역 상태 업데이트
      setUser({
        ...userInfo,
        notifications: userInfo?.notifications?.splice(
          0,
          userInfo?.notifications?.length
        ),
      });
      const { status } = await api.put("/notifications/seen");
      try {
        setUser(userInfo);
      } catch (error) {
        if (status === 400) console.log(error);
      }

      notificationNumberClean();
    } catch (error) {
      console.log(error);
      if ((error as AxiosError).response?.status === 400) {
        alert("아이디나 비밀번호가 틀립니다.");
      }
    }
  };

  const userInfo = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.setUser);

  const notificationNumberClean = () => {
    setNotificationNumber([0, 0, 0]);
  };

  const [isComment, setIsComment] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const showCommentHandler = () => {
    setIsComment(!isComment);
    setIsFollow(false);
    setIsLike(false);
  };
  const showFollowHandler = () => {
    setIsFollow(!isFollow);
    setIsComment(false);
    setIsLike(false);
  };
  const showLikeHandler = () => {
    setIsLike(!isLike);
    setIsFollow(false);
    setIsComment(false);
  };

  // notificatioArray갯수 따라서 표시해주기
  // const notificationNumber: number[] = [0, 0, 0];
  const [notificationNumber, setNotificationNumber] = useState<number[]>([
    0, 0, 0,
  ]);

  useEffect(() => {
    if (notificationArray.length != 0) {
      // console.log(notificationArray[0].like);
      let likeCount = 0;
      let followCount = 0;
      let commentCount = 0;
      notificationArray.map((notification: notificationType) =>
        notification.like === null || undefined
          ? (likeCount = likeCount + 1)
          : notification.follow != undefined
          ? (followCount = followCount + 1)
          : (commentCount = commentCount + 1)
      );

      setNotificationNumber([commentCount, followCount, likeCount]);
    }
  }, []);

  const notificationTypes = [
    {
      type: "comment",
      icon: commentIcon,
      actionIcon: action_comment,
      isActive: isComment,
      count: notificationNumber[0],
      handler: showCommentHandler,
    },
    {
      type: "follow",
      icon: followIcon,
      actionIcon: action_noti_follow,
      isActive: isFollow,
      count: notificationNumber[1],
      handler: showFollowHandler,
    },
    {
      type: "like",
      icon: likeIcon,
      actionIcon: action_noti_like,
      isActive: isLike,
      count: notificationNumber[2],
      handler: showLikeHandler,
    },
  ];

  return (
    <div className="absolute z-10 top-[53px] right-[-78px] rounded-[10px]">
      {/* 말풍선 본문 */}
      <div
        className="w-[380px] max-h-[560px] overflow-y-scroll bg-white border border-gray-200 rounded-xl shadow-lg p-6 scrollbar-none dark:bg-blackDark dark:border-darkGreyDark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="scrollbar-none">
          {/* 헤더 버튼 필터링 */}
          <div className="sticky top-0 z-10 pb-5 bg-white dark:bg-blackDark">
            <div className="relative flex items-center justify-between w-full px-10 ">
              {notificationTypes.map((notification) => (
                <div
                  key={notification.type}
                  className="relative cursor-pointer"
                  onClick={notification.handler}
                >
                  <img
                    src={
                      notification.isActive
                        ? notification.actionIcon
                        : notification.icon
                    }
                    className={twMerge("h-[36px] z-40")}
                  />
                  {notification.count !== 0 && (
                    <div
                      className={twMerge(
                        "min-w-5 h-5 rounded-[50%] bg-red-500 absolute bottom-0 left-[23px] text-white text-center z-50 text-[10px] font-light leading-loose"
                      )}
                    >
                      {notification.count >= 100 ? `99+` : notification.count}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* 알림박스 */}
          <div className="w-full overflow-y-auto max-h-[330px] scrollbar-none flex flex-col items-center gap-1">
            {/* 커멘트만 보여주기 */}
            {notificationArray && isComment ? (
              notificationArray
                .filter(
                  (notification: notificationType) =>
                    notification.comment === null || undefined
                )
                .map((notification: notificationType) => (
                  <NotificationBox
                    key={notification._id}
                    fullname={notification.author.fullName}
                    userid={notification.author._id}
                    image={notification.author.image}
                    notificationType={"comment"}
                    postId={notification?.post}
                    follow={notification?.follow}
                  ></NotificationBox>
                ))
            ) : // 팔로우만 보여주기기
            notificationArray && isFollow ? (
              notificationArray
                .filter(
                  (notification: notificationType) =>
                    notification.follow != null || undefined
                )
                .map((notification: notificationType) => (
                  <NotificationBox
                    key={notification._id}
                    fullname={notification.author.fullName}
                    userid={notification.author._id}
                    image={notification.author.image}
                    notificationType={"follow"}
                    postId={notification?.post}
                    follow={notification?.follow}
                  ></NotificationBox>
                ))
            ) : // 좋아요만 보여주기
            notificationArray && isLike ? (
              notificationArray
                .filter(
                  (notification: notificationType) =>
                    notification.like === null || undefined
                )
                .map((notification: notificationType) => (
                  <NotificationBox
                    key={notification._id}
                    fullname={notification.author.fullName}
                    userid={notification.author._id}
                    image={notification.author.image}
                    notificationType={"like"}
                    postId={notification?.post}
                    follow={notification?.follow}
                  ></NotificationBox>
                ))
            ) : // 전체 다 보여주기
            notificationArray.length ? (
              notificationArray.map((notification: notificationType) => (
                <NotificationBox
                  key={notification._id}
                  fullname={notification.author.fullName}
                  userid={notification.author._id}
                  image={notification.author.image}
                  notificationType={
                    notification.like === null || undefined
                      ? "like"
                      : notification.follow != undefined
                      ? "follow"
                      : "comment"
                  }
                  postId={notification?.post}
                  follow={notification?.follow}
                ></NotificationBox>
              ))
            ) : (
              // 알림없을때 처리

              <p className="items-center my-10 text-xl text-gray-500 jusitify-center">
                알림이 없습니다
              </p>
            )}
          </div>
          {/* 버튼 */}
          <div className="sticky bottom-0 z-10 bg-white dark:bg-blackDark">
            <div className="flex justify-end mt-4 space-x-2 ">
              <ButtonComponent
                bgcolor="bg-white dark:bg-blackDark dark:hover:bg-darkGreyDark"
                textcolor="text-[#265CAC] dark:text-mainDark"
                border="border-[1px] dark:border-mainDark"
                onClick={() => {
                  // Todo 모두읽기 기능 구현
                  notificationSeen();
                  // isNoti(); // 없어도 가능
                }}
              >
                {"모두읽기"}
              </ButtonComponent>
              <ButtonComponent
                bgcolor="bg-[#265CAC] dark:bg-mainDark dark:hover:bg-mainTextDark"
                textcolor="text-[white] dark:text-blackDark"
                onClick={closeNoti}
              >
                {"닫기"}
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
