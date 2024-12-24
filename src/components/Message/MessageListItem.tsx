import { NavLink, useSearchParams } from "react-router";
import { useAuthStore } from "../../store/authStore";
import { twMerge } from "tailwind-merge";
import formatMessageTime from "../../utils/formatMessageTime";
import defaultProfileImg from "../../../public/logo.png";

interface MessageListItemProps {
  conversation: Conversation;
}

export default function MessageListItem({
  conversation,
}: MessageListItemProps) {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user");
  const myId = useAuthStore((state) => state.user)?._id;
  const otherUser =
    conversation.sender._id === myId
      ? conversation.receiver
      : conversation.sender;
  const isActive = userId === otherUser?._id;

  return (
    <NavLink
      to={`/message?user=${otherUser?._id}`}
      className={twMerge(
        "p-3 rounded-lg my-1 group transition-all",
        isActive ? "bg-primary" : "hover:bg-secondary dark:bg-white/20"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <img
            src={otherUser?.image || defaultProfileImg}
            alt="프로필 이미지"
            className={twMerge(
              "w-[30px] h-[30px] mr-3 rounded-full profile profile-hover transition-all",
              isActive && "border-gray-c8 bg-white/80"
            )}
          />
          <p
            className={twMerge(
              "text-lg font-medium text-gray-22",
              isActive
                ? "dark:text-gray-22"
                : "dark:text-white dark:group-hover:text-gray-22"
            )}
          >
            {otherUser?.fullName}
          </p>
        </div>
        <p
          className={twMerge(
            "text-sm text-gray-6c",
            isActive
              ? "dark:text-gray-6c"
              : "dark:text-gray-c8 dark:group-hover:text-gray-6c"
          )}
        >
          {formatMessageTime(conversation.createdAt)}
        </p>
      </div>
      <p
        className={twMerge(
          "line-clamp-1 break-all text-gray-6c",
          isActive
            ? "dark:text-gray-6c"
            : "dark:text-gray-c8 dark:group-hover:text-gray-6c"
        )}
      >
        {conversation.message}
      </p>
    </NavLink>
  );
}
