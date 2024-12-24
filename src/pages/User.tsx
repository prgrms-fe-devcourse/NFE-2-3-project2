import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import UserInfoCard from "../components/User/UserInfoCard";
import ImageCard from "../components/ImageCard";

export default function User() {
  const { user_id } = useParams();
  const [user, setUser] = useState<UserInfoType | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await api.get(`/users/${user_id}`);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [user_id]);
  return (
    <>
      {user && (
        <div className="flex flex-col items-center h-full py-8 min-h-min dark:bg-lightBlackDark">
          <div className=" flex flex-col gap-[40px]">
            <UserInfoCard
              uname={user.fullName}
              userId={user._id}
              followers={user.followers || []}
              following={user.following || []}
              image={user.image}
            />
            <div>
              <p className="dark:text-white text-[18px] mb-[20px] font-medium ">
                게시물 {user.posts?.length}개
              </p>

              <div className="border-t pt-[10px] px-1 flex justify-center">
                {user.posts && user.posts.length > 0 ? (
                  <div className="flex flex-col items-start mt-[20px]">
                    <div className="flex items-center justify-center">
                      <div className="grid gap-8 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2">
                        {user.posts?.map((post) => (
                          <ImageCard
                            key={post._id}
                            image={post.image}
                            comments={post.comments}
                            createdAt={post.createdAt}
                            likes={post.likes}
                            title={post.title}
                            fullName={user.fullName}
                            userImg={user.image}
                            _id={post._id}
                            channel={post.channel}
                            disableNavigate // 프로필 navigate 없애는 용도
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-[814px]">
                    <p className="text-center text-[18p] text-lightBlackDark dark:text-skyDark mt-5">
                      게시물이 없습니다
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
