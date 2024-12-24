import { twMerge } from "tailwind-merge";
import { useAllUserStore } from "../../store/allUserStore";
import confirmAndNavigateToLogin from "../../utils/confirmAndNavigateToLogin";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { createNotification } from "../../api/notification";
import { deleteFollow, postFollow } from "../../api/follow";
import defaultProfileImg from "../../../public/logo.png";
import { useAuthStore } from "../../store/authStore";

interface FollowingUser {
  user: Follow;
  myFollowInfo: Follow | undefined;
}

export default function FollowingUser({ user, myFollowInfo }: FollowingUser) {
  const [userInfo, setUserInfo] = useState<User>();
  const [loading, setLoading] = useState(false);
  const getUser = useAllUserStore((state) => state.getUser);
  const getMyInfo = useAuthStore((state) => state.getMyInfo);
  const checkIsMyUserId = useAuthStore((state) => state.checkIsMyUserId);
  const navigate = useNavigate();
  const isMine = checkIsMyUserId(user.user);

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    confirmAndNavigateToLogin(navigate);

    try {
      setLoading(true);
      const result = await postFollow(user.user);

      if (result) {
        await createNotification({
          notificationType: "FOLLOW",
          notificationTypeId: result._id,
          userId: result.user,
        });
      }
    } catch (err) {
      console.error("팔로우 요청 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!myFollowInfo) return;

    try {
      setLoading(true);
      await deleteFollow(myFollowInfo._id);
    } catch (err) {
      console.error("언팔로우 요청 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUser(user.user);
      setUserInfo(data);
    };

    if (isMine) {
      const myInfo = getMyInfo();
      setUserInfo(myInfo ?? undefined);
    } else {
      fetchUserInfo();
    }
  }, []);

  return (
    <article
      className="w-28 shrink-0 flex flex-col items-center gap-1 cursor-pointer overflow-hidden"
      onClick={() => navigate(`/user/${user.user}`)}
    >
      <img
        src={userInfo?.image ?? defaultProfileImg}
        alt={userInfo?.fullName}
        className="w-24 h-24 profile rounded-full"
      />
      <p className="text-base text-center mb-1 w-full overflow-hidden text-ellipsis">
        {userInfo?.fullName}
      </p>
      {isMine ? (
        <button
          className="w-full rounded-lg py-1 text-sm primary-btn"
          onClick={() => navigate("/mypage")}
        >
          마이페이지
        </button>
      ) : (
        <button
          className={twMerge(
            "w-full rounded-lg py-1 text-sm",
            myFollowInfo ? "secondary-btn" : "primary-btn"
          )}
          disabled={loading}
          onClick={myFollowInfo ? handleUnFollow : handleFollow}
        >
          {myFollowInfo ? "언팔로우" : "팔로우"}
        </button>
      )}
    </article>
  );
}
