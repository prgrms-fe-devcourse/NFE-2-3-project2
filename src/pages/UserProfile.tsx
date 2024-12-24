import { Navigate, useParams } from "react-router";
import PostCardGridSection from "../components/Profile/PostCardGridSection";
import ProfileSection from "../components/Profile/ProfileSection";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/common/Loading";
import FollowingSection from "../components/Profile/FollowingSection";
import useGetProfile from "../hooks/useGetProfile";
import { PROFILE_TEXT } from "../constants/profile";

export default function UserProfile() {
  const { userId } = useParams();
  const checkIsMyUserId = useAuthStore((state) => state.checkIsMyUserId);
  const { data: profileUser, loading, error } = useGetProfile(userId, false);

  if (checkIsMyUserId(userId!)) return <Navigate to="/mypage" replace />;

  if (loading || error || !profileUser)
    return (
      <section className="w-[934px] mx-auto flex items-center justify-center">
        {loading && <Loading />}
        {error && (
          <p className="text-lg font-medium text-gray-54 dark:text-gray-c8">
            {PROFILE_TEXT.error}
          </p>
        )}
      </section>
    );

  return (
    <section className="w-[934px] mx-auto flex flex-col items-center gap-10">
      <ProfileSection user={profileUser} />
      <FollowingSection
        fullName={profileUser.fullName}
        followingList={profileUser.following}
      />
      <PostCardGridSection
        fullName={profileUser.fullName}
        posts={profileUser.posts}
      />
    </section>
  );
}
