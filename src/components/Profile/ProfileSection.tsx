import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "../../store/authStore";
import UserAvatar from "../common/UserAvatar";
import confirmAndNavigateToLogin from "../../utils/confirmAndNavigateToLogin";
import { createNotification } from "../../api/notification";
import { deleteFollow, postFollow } from "../../api/follow";

interface ProfileSectionProps {
  user: User | undefined;
  isMyProfile?: boolean;
}

export default function ProfileSection({
  user,
  isMyProfile = false,
}: ProfileSectionProps) {
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(
    user?.followers.length || 0
  ); // 팔로워 수 상태 추가
  const [followId, setFollowId] = useState<string | null>(null);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const myId = useAuthStore((state) => state.user)?._id;

  useEffect(() => {
    const foundFollowId = user?.followers.find(
      (follower) => follower.follower === myId
    )?._id;

    // 상태 업데이트
    setFollowId(foundFollowId || null);
    setIsFollow(!!foundFollowId);
  }, [user?.followers]); // followers 배열 변경 시에만 실행

  const handleUnFollow = async () => {
    if (!followId || !isLoggedIn) return;

    try {
      setLoading(true);
      const result = await deleteFollow(followId);
      if (result) {
        // 상태 직접 업데이트
        setIsFollow(false);
        setFollowersCount((prevCount) => Math.max(prevCount - 1, 0));
        setFollowId(null);
      }
    } catch (err) {
      console.error("언팔로우 요청 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    confirmAndNavigateToLogin(navigate);

    try {
      setLoading(true);
      const result = await postFollow(user!._id);

      if (result) {
        // 상태 직접 업데이트
        setIsFollow(true);
        setFollowersCount((prevCount) => prevCount + 1);
        setFollowId(result._id);

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

  const handleMessage = () => {
    confirmAndNavigateToLogin(navigate);
    navigate(`/message?user=${user?._id}`);
  };

  return (
    <article className="border-b border-gray-ee dark:border-gray-ee/50 flex justify-center items-center gap-20 p-10 w-full">
      <UserAvatar name={user?.fullName} image={user?.image} />
      <section className="w-max">
        <div className="flex w-[208px] justify-between mb-4">
          <div className="text-center">
            <p className="text-xl">{user?.posts.length}</p>
            <p className="text-lg">게시물</p>
          </div>
          <div className="text-center">
            <p className="text-xl">{followersCount}</p>
            <p className="text-lg">팔로워</p>
          </div>
          <div className="text-center">
            <p className="text-xl">{user?.following.length}</p>
            <p className="text-lg">팔로잉</p>
          </div>
        </div>
        <div className="flex gap-[10px]">
          {isMyProfile ? (
            <>
              <button
                type="button"
                className="primary-btn w-full py-1 rounded-lg text-sm"
                onClick={() => navigate("/mypage/edit")}
              >
                프로필 수정
              </button>
              <button
                type="button"
                className="primary-btn w-full py-1 rounded-lg text-sm"
                onClick={() => navigate("/mypage/edit/password")}
              >
                비밀번호 변경
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={twMerge(
                  "w-full py-1 rounded-lg text-sm",
                  isFollow ? "secondary-btn" : "primary-btn"
                )}
                onClick={isFollow ? handleUnFollow : handleFollow}
                disabled={loading}
              >
                {isFollow ? "언팔로우" : "팔로우"}
              </button>
              <button
                type="button"
                className="primary-btn w-full py-1 rounded-lg text-sm"
                onClick={handleMessage}
              >
                메시지 보내기
              </button>
            </>
          )}
        </div>
      </section>
    </article>
  );
}
