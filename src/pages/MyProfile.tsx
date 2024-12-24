import PostCardGridSection from "../components/Profile/PostCardGridSection";
import ProfileSection from "../components/Profile/ProfileSection";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/common/Loading";
import FollowingSection from "../components/Profile/FollowingSection";
import useGetProfile from "../hooks/useGetProfile";
import { PROFILE_TEXT } from "../constants/profile";

export default function MyProfile() {
  const myId = useAuthStore((state) => state.user)?._id;
  const { data: user, loading, error } = useGetProfile(myId, true);

  if (loading || error || !user)
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
      <ProfileSection user={user} isMyProfile />
      <FollowingSection
        fullName={user.fullName}
        followingList={user.following}
        isMyProfile
      />
      <PostCardGridSection
        fullName={user.fullName}
        posts={user.posts}
        isMyProfile
      />
    </section>
  );
}
