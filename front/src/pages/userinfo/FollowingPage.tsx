import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchUsersByFullName, getUserProfile } from "../../apis/apis";
import AllUsersList from "./AllUserList";
import Loading from "../../components/Loading";
import Follow from "../post/Follow";
import userImg from "../../assets/user.png";

interface UserProfile {
  _id: string;
  fullName: string;
  username: string;
  image: string;
  followers: string[];
}

const FollowingPage = () => {
  const { fullname } = useParams<{ fullname: string }>();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [following, setFollowing] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState(() => {
    const storedUserData = sessionStorage.getItem("user");
    return storedUserData ? JSON.parse(storedUserData) : { likes: [], following: [] };
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);

      if (!fullname) {
        setError("사용자의 fullName이 없습니다.");
        setIsLoading(false);
        return;
      }

      try {
        // fullname으로 사용자 검색
        const users = await searchUsersByFullName(fullname);
        if (!users || users.length === 0) {
          setError("사용자를 찾을 수 없습니다.");
          setIsLoading(false);
          return;
        }

        const user = users[0];

        // 사용자 정보 가져오기
        const userProfile = await getUserProfile(user._id);
        setCurrentUser(userProfile);
        console.log(setCurrentUser(userProfile));

        const followingDetails = await Promise.all(
          userProfile.following.map(async (followingObj: any) => {
            try {
              const followingProfile = await getUserProfile(followingObj.follower);
              return {
                _id: followingProfile._id,
                fullName: followingProfile.fullName,
                username: followingProfile.username,
                image: followingProfile.image || userImg,
              };
            } catch (err) {
              console.error(`팔로잉 정보 로드 실패: ${followingObj.follower}`, err);
              return null;
            }
          }),
        );

        // 팔로워 목록 업데이트, null을 제거
        const validFollowing = followingDetails.filter(Boolean) as UserProfile[];
        setFollowing(validFollowing);
      } catch (err) {
        console.error(err);
        setError("팔로잉 정보를 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [fullname]);

  const handleFollowingClick = (following: UserProfile) => {
    navigate(`/userinfo/${following.fullName}`); // 새 URL로 이동
  };

  const handleFollowUpdate = (updatedUserData: any) => {
    setUserData(updatedUserData);
    sessionStorage.setItem("user", JSON.stringify(updatedUserData));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!currentUser) {
    return <div>사용자 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="px-[30px] py-6">
      <h2 className="text-[16px] font-semibold font-pretendard mb-8 text-black dark:text-white">
        {currentUser.fullName}님의 팔로잉
      </h2>
      {following.length === 0 ? (
        <p>팔로잉이 없습니다.</p>
      ) : (
        <ul>
          {following.map((followed) => (
            <li key={followed._id} className="mb-4 font-pretendard">
              <div className="flex items-center justify-between pb-4 mb-4">
                <div className="flex items-center cursor-pointer" onClick={() => handleFollowingClick(followed)}>
                  <img
                    src={followed.image || ""}
                    alt={followed.fullName}
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />
                  <div className="flex flex-col justify-between ml-4">
                    <span className="text-[16px] font-semibold text-black dark:text-white">{followed.fullName}</span>
                    <span className="text-[14px] text-gray-300">{followed.username}</span>
                  </div>
                </div>

                <div className="ml-auto">
                  {userData._id !== followed._id && (
                    <Follow
                      userData={userData}
                      onFollowUpdate={handleFollowUpdate}
                      targetUserId={followed._id}
                      className="w-[80px] h-[30px] text-[14px] ml-4"
                    />
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 팔로잉 목록 하단에 AllUserList 컴포넌트 추가 */}
      <AllUsersList />
    </div>
  );
};

export default FollowingPage;
