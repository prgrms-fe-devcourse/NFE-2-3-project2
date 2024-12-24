import useEmblaCarousel from "embla-carousel-react";
import { useAuthStore } from "../../store/authStore";
import FollowingUser from "./FollowingUser";
import { useCarouselButtons } from "../../hooks/useCarouselButtons";
import ArrowButton from "./ArrowButton";
import { FOLLOWING_DEFAULT_COUNT, PROFILE_TEXT } from "../../constants/profile";

interface FollowingSectionProps {
  fullName: string;
  followingList: Follow[];
  isMyProfile?: boolean;
}

export default function FollowingSection({
  fullName,
  followingList,
  isMyProfile = false,
}: FollowingSectionProps) {
  const myFollowing = useAuthStore((state) => state.user)?.following;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 3,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useCarouselButtons(emblaApi);

  return (
    <section className="border-b border-gray-ee dark:border-gray-ee/50 w-full pb-10">
      <h2 className="text-2xl font-semibold mb-6">
        {isMyProfile ? (
          <>나의 팔로잉 목록</>
        ) : (
          <>
            <span className="text-highlight">{fullName}</span>님의 팔로잉 목록
          </>
        )}
      </h2>
      {followingList.length === 0 ? (
        <div className="flex items-center justify-center my-20">
          <p className="text-lg text-center text-gray-54 dark:text-gray-c8">
            {PROFILE_TEXT.noFollowing}
          </p>
        </div>
      ) : (
        <section className="relative px-7">
          {followingList.length > FOLLOWING_DEFAULT_COUNT && (
            <ArrowButton
              className="left-0"
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              left
            />
          )}
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-10">
              {followingList.map((followingUser) => (
                <FollowingUser
                  key={followingUser._id}
                  user={followingUser}
                  myFollowInfo={myFollowing?.find(
                    (following) => following.user === followingUser.user
                  )}
                />
              ))}
            </div>
          </div>
          {followingList.length > FOLLOWING_DEFAULT_COUNT && (
            <ArrowButton
              className="right-0"
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              right
            />
          )}
        </section>
      )}
    </section>
  );
}
