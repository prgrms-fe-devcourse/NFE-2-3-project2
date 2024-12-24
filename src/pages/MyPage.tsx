import { useAuth } from "../stores/authStore";
import { useLoadingStore } from "../stores/loadingStore";
import UserCard from "../components/User/UserCard";
import CheckDone from "../components/checkDone/CheckDone";
import Loading from "../components/Loading";
import CustomCalendar from "../components/MyPage/CustomCalendar";
import { useEffect, useState } from "react";
import { usesidebarToggleStore } from "../stores/sideberToggleStore";
import { twMerge } from "tailwind-merge";
import ImageCard from "../components/ImageCard";
export default function MyPage() {
  // 토글 유무 확인
  const isToggle = usesidebarToggleStore((state) => state.isToggle);

  const myInfo = useAuth((state) => state.user);
  const isLoading = useLoadingStore((state) => state.isLoading);

  const [myLike, setMyLike] = useState<(string | null)[]>([]);

  useEffect(() => {
    if (myInfo?.likes) {
      const myLike = myInfo?.likes.map((like) =>
        like.post ? like.post : null
      );
      setMyLike(myLike);
    }
  }, [myInfo]);
  return (
    <>
      {myInfo && (
        <div className="relative flex flex-col items-center h-full py-8 min-h-min dark:bg-lightBlackDark">
          <div className="flex flex-col gap-[40px]">
            <UserCard
              uname={myInfo.fullName!}
              followers={myInfo.followers}
              following={myInfo.following}
              BackWidth="w-[100px]"
              BackHeight="h-[100px]"
              IconWidth="w-[80px]"
              IconHeight="h-[80px]"
              edit={true}
              update={true}
              userImg={myInfo.image}
            />
            <div className="flex flex-col items-center w-full gap-4 xl:flex-row">
              <CustomCalendar />
              <CheckDone bg="bg-[#F7FAFF] dark:bg-darkGreyDark" />
            </div>
            <div>
              <p className=" text-[18px] mb-[20px] font-medium dark:text-white">
                게시물 {myInfo.posts?.length}개
              </p>
              <div className="border-t pt-[10px] px-1 flex justify-center">
                <div className="flex flex-col items-start mt-[20px]">
                  <div className="flex items-center justify-center">
                    <div
                      className={twMerge(
                        "grid gap-8 grid-cols-4",
                        isToggle
                          ? "max-[1396px]:grid-cols-3 max-[1114px]:grid-cols-2 max-[832px]:grid-cols-1"
                          : "max-[1176px]:grid-cols-3 max-[894px]:grid-cols-2 max-[612px]:grid-cols-1"
                      )}
                    >
                      {myInfo.posts?.map((post) => (
                        <ImageCard
                          key={post._id}
                          image={post.image}
                          comments={post.comments}
                          createdAt={post.createdAt}
                          likes={post.likes}
                          title={post.title}
                          fullName={myInfo.fullName}
                          userImg={myInfo.image}
                          _id={post._id}
                          channel={post.channel}
                          myLike={myLike}
                          disableNavigate // 프로필 navigate 없애는 용도
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isLoading ? <Loading /> : null}
        </div>
      )}
    </>
  );
}
