import { useNavigate } from "react-router";
import defaultUserImg from "../assets/defaultUser.svg";
import { api } from "../api/axios";
import { channelMapping } from "../constants/channel";

interface NotificationBoxPropsType {
  fullname: string;
  image?: string | null;
  userid: string;
  notificationType: string;
  postId?: string;
  follow?: string;
}

export default function NotificationBox({
  fullname,
  image,
  userid,
  notificationType,
  postId,
}: NotificationBoxPropsType) {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (notificationType === "comment" || notificationType === "like") {
      if (postId) {
        const { data } = await api.get(`/posts/${postId}`);

        const getChannel = Object.keys(channelMapping).find(
          (key) => channelMapping[key] === data.channel._id
        );

        if (getChannel) {
          navigate(`/${getChannel}/${postId}`);
        }
      } else {
        return;
      }
    }

    if (notificationType === "follow") {
      navigate(`/user/${userid}`);
    }
  };

  return (
    <div
      className="w-[320px] h-[75px] bg-[#f5f5f5] mb-[5px] flex items-center 
      gap-3 pl-[20px] rounded-[10px] flex-shrink-0 
      dark:bg-darkGreyDark dark:text-greyDark cursor-pointer"
      onClick={handleClick}
    >
      {/* 유저 프로필, 현활 */}

      <img
        src={image ? image : defaultUserImg}
        alt="사용자 프로필 사진"
        className="w-[48px] h-[48px] rounded-[50%] shadow-inner cursor-pointer"
      />

      {notificationType === "follow" && (
        <div className=" w-[220px] h-[50px] flex items-center">
          <article className="text-xs font-medium">
            <span className="font-bold">{fullname}</span>님이 나를 팔로우합니다!
          </article>
        </div>
      )}
      {notificationType === "comment" && (
        <div className="w-[220px] h-[50px] flex items-center">
          <p className="text-xs font-medium">
            <span className="font-bold">{fullname}</span>님이 내 글에 댓글을
            남겼습니다
          </p>
        </div>
      )}
      {notificationType === "like" && (
        <div className=" w-[230px] h-[50px] flex items-center">
          <p className="text-xs font-medium">
            <span className="font-bold">{fullname}</span>님이 내 글에 좋아요를
            눌렀습니다
          </p>
        </div>
      )}
    </div>
  );
}
