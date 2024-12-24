import BoardGrid from "../components/user/BoardGrid";
import Button from "../components/common/Button";
import { getSpecificUser } from "../api/users";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import Avata from "../components/common/Avata";
import { deleteFollowDelete, postFollowCreate } from "../api/follow";
import { postNotification } from "../api/notification";
import { useModal } from "../stores/modalStore";
import images from "../assets";
import { useAuthStore } from "../stores/authStore";
import FollowList from "../components/user/FollowList";
import SendMessage from "../components/user/SendMessage";
import ChatMessage from "../components/user/ChatMessage";
import Loading from "../components/common/Loading";
import { Fancybox } from "@fancyapps/ui";
import useDebounce from "../hooks/useDebounce";

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [specificUser, setSpecificUser] = useState<User | null>(null);
  const [followList, setFollowList] = useState<User[]>([]);
  const loggedInUser = useAuthStore((state) => state.user);

  // 팔로우/팔로잉 기능
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollow, setIsFollow] = useState(false);
  const [followId, setFollowId] = useState<string | null>(null);
  const setOpen = useModal((state) => state.setModalOpen);

  // FollowList 모달 관리
  const [isFollowListOpen, setFollowListOpen] = useState(false);
  const [followListType, setFollowListType] = useState<
    "followers" | "following"
  >("followers");
  const [loadingFollowList, setLoadingFollowList] = useState(false);
  const toggleFollowList = () => setFollowListOpen((prev) => !prev);

  const followHandlingRef = useRef<boolean>(false);
  const debouncedIsLike = useDebounce(isFollow);

  //* Message */
  const [msgOpen, setMsgOpen] = useState<boolean>(false);
  const [type, setType] = useState<"SEND" | "CHAT">("SEND");

  const fetchUserDetails = async (userId: string): Promise<User> => {
    try {
      return await getSpecificUser(userId);
    } catch (error) {
      throw new Error("알수 없는 사용자");
    }
  };

  const loadFollowList = async () => {
    if (!specificUser) return;
    setLoadingFollowList(true);
    setFollowList([]);

    try {
      if (followListType === "followers") {
        const followers = await Promise.all(
          specificUser.followers.map(async (f) => fetchUserDetails(f.follower))
        );
        setFollowList(followers);
      } else {
        const following = await Promise.all(
          specificUser.following.map(async (f) => fetchUserDetails(f.user))
        );
        setFollowList(following);
      }
    } catch (error) {
      console.error("팔로우/팔로잉 목록 로드 실패", error);
    } finally {
      setLoadingFollowList(false);
    }
  };

  // 로그인 전 팔로우 버튼 누르면 모달
  const handleOpenModal = () => {
    setOpen(true, {
      message: "로그인 후 팔로우 해주세요!",
      btnText: "확인",
      btnColor: "main",
      onClick: () => {
        setOpen(false);
        navigate("/auth/signIn");
      },
    });
  };

  const handleFollowClick = () => {
    if (!loggedInUser) return handleOpenModal();
    followHandlingRef.current = true;
    setIsFollow((prev) => !prev);
    setFollowerCount((prev) => (isFollow ? prev - 1 : prev + 1));
  };

  const handleFollow = async () => {
    // 로그인된 유저 정보가 없음 || 팔로우 대상의 정보가 없음 || 이미 팔로우 상태
    if (!loggedInUser) return handleOpenModal();
    if (!specificUser) return;

    try {
      const response = await postFollowCreate(specificUser._id);

      setFollowId(response._id);
      if (loggedInUser._id !== specificUser._id)
        await postNotification({
          notificationType: "FOLLOW",
          notificationTypeId: response._id,
          userId: specificUser._id,
          postId: loggedInUser._id,
        });
    } catch (error) {
      console.error(`팔로우 실패` + error);
    }
  };

  const handleUnfollow = async () => {
    if (!followId) return;
    try {
      await deleteFollowDelete(followId);

      setFollowId(null);
    } catch (error) {
      console.error(`언팔로우 실패` + error);
    }
  };

  useEffect(() => {
    if (!followHandlingRef.current) return;
    debouncedIsLike ? handleFollow() : handleUnfollow();
    followHandlingRef.current = false;
  }, [debouncedIsLike]);

  const fetchSpecificUser = async () => {
    try {
      if (!id) return;
      const user = await getSpecificUser(id);
      setSpecificUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSpecificUser();
  }, [id]);

  useEffect(() => {
    if (isFollowListOpen) {
      loadFollowList();
    }
  }, [isFollowListOpen, followListType]);

  useEffect(() => {
    if (loggedInUser && specificUser) {
      const isFollowing = specificUser.followers.find(
        (fu) => fu.follower === loggedInUser._id
      );
      if (isFollowing) {
        setIsFollow(!!isFollowing);
        setFollowId(isFollowing._id);
      } else {
        setIsFollow(false);
        setFollowId(null);
      }
      setFollowerCount(specificUser.followers.length);
    }
  }, [loggedInUser, specificUser]);

  // URL 변경 시 모달 닫기
  useEffect(() => {
    if (isFollowListOpen) setFollowListOpen(false);
  }, [location]);

  // Message Handling
  const handleClickMsg = (type: "SEND" | "CHAT") => {
    if (!loggedInUser) return handleOpenMsgModal();
    setMsgOpen((prev) => !prev);
    setType(type);
  };

  //handleOpenModal 문구를 "로그인 후 이용해주세요"로 통일하고 하나로 써도 될 듯
  const handleOpenMsgModal = () => {
    setOpen(true, {
      message: "로그인 후 메시지를 보내세요!",
      btnText: "확인",
      btnColor: "main",
      onClick: () => {
        setOpen(false);
        navigate("/auth/signIn");
      },
    });
  };

  if (!specificUser) return <Loading />;

  const isMyPage = loggedInUser?._id === specificUser._id;
  const followBtnTxt = isMyPage
    ? "프로필 수정"
    : isFollow
    ? "팔로우 끊기"
    : "팔로우";

  const handleClickFollow = isMyPage ? undefined : handleFollowClick;

  const handleProfileClick = () => {
    if (specificUser?.image) {
      Fancybox.show([
        {
          src: specificUser.image,
          type: "image",
        },
      ]);
    }
  };
  return (
    <>
      <div className="h-[100px] px-[30px] z-[9] sticky top-0 left-0 flex justify-between items-center dark:text-white bg-white dark:bg-black border-b border-whiteDark dark:border-gray md:hidden">
        <button onClick={() => navigate(-1)}>
          <img
            className="dark:invert dark:hover:fill-white"
            src={images.Back}
            alt="back icon"
          />
        </button>
      </div>
      <div className="py-[70px] md:py-[30px] px-[50px] md:px-[20px] text-black dark:text-white flex flex-col items-center">
        <div className="w-full max-w-[826px] md:max-w-full">
          <div className="flex mb-[30px] md:mb-5 items-end gap-[30px]">
            <Avata
              profile={specificUser?.image}
              size="lg"
              onClick={handleProfileClick}
            />
            <div className="flex flex-col gap-[50px] md:gap-[17px]">
              <div className="flex flex-col gap-[10px] md:gap-0">
                <h2 className="text-[22px] md:text-base font-bold">
                  {specificUser.fullName}
                </h2>
                <p className="text-lg md:text-xs text-gray dark:text-whiteDark">
                  {specificUser.email}
                </p>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex gap-[30px]">
                  <div
                    className="flex items-center gap-[5px] cursor-pointer md:flex-col md:gap-0"
                    onClick={() => {
                      setFollowListType("followers");
                      toggleFollowList();
                    }}>
                    <span className="md:text-[14px] whitespace-nowrap">
                      팔로워
                    </span>{" "}
                    <span className="text-gray dark:text-whiteDark font-bold">
                      {followerCount}
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-[5px] cursor-pointer md:flex-col md:gap-0"
                    onClick={() => {
                      setFollowListType("following");
                      toggleFollowList();
                    }}>
                    <span className="md:text-[14px] whitespace-nowrap">
                      팔로잉
                    </span>{" "}
                    <span className="text-gray dark:text-whiteDark font-bold">
                      {specificUser.following.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-[5px] md:flex-col md:gap-0">
                    <span className="md:text-[14px] whitespace-nowrap">
                      포스트
                    </span>{" "}
                    <span className="text-gray dark:text-whiteDark font-bold ">
                      {specificUser.posts.length}
                    </span>
                  </div>
                </div>

                {/* id가 내 id이면 프로필 수정 버튼 / 아니면 팔로잉 버튼 */}
                <div className="flex gap-[30px] items-center md:hidden">
                  <Button
                    to={isMyPage ? `/user/edit` : undefined}
                    text={followBtnTxt}
                    size={"md"}
                    className="max-w-[188px]"
                    onClick={handleClickFollow}
                    theme={followBtnTxt === "팔로우 끊기" ? "sub" : "main"}
                  />
                  <button
                    type="button"
                    onClick={() => handleClickMsg(isMyPage ? "CHAT" : "SEND")}>
                    <img
                      className="w-[25px] h-[25px] dark:invert dark:hover:fill-white"
                      src={
                        isMyPage ? images.MessageBoxBtn : images.MessageSendBtn
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-[30px] items-center mb-[10px]">
            <Button
              to={isMyPage ? `/user/edit` : undefined}
              text={followBtnTxt}
              size={"md"}
              className="max-w-[188px] hidden md:block"
              onClick={handleClickFollow}
              theme={followBtnTxt === "팔로우 끊기" ? "sub" : "main"}
            />
            <button
              type="button"
              className="hidden md:block"
              onClick={() => handleClickMsg(isMyPage ? "CHAT" : "SEND")}>
              <img
                className="w-[25px] h-[25px] dark:invert dark:hover:fill-white"
                src={isMyPage ? images.MessageBoxBtn : images.MessageSendBtn}
              />
            </button>
          </div>
          <BoardGrid posts={specificUser.posts} />
        </div>
      </div>
      {isFollowListOpen && (
        <FollowList
          users={followList}
          title={followListType === "followers" ? "팔로워" : "팔로잉"}
          loading={loadingFollowList}
          toggleOpen={toggleFollowList}
        />
      )}
      {msgOpen && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 flex items-center justify-center z-[9999]">
          {type === "SEND" && (
            <SendMessage
              onClose={() => setMsgOpen(false)}
              receiver={specificUser}
              checkLogin={handleOpenMsgModal}
            />
          )}
          {type === "CHAT" && <ChatMessage onClose={() => setMsgOpen(false)} />}
        </div>
      )}
    </>
  );
}
