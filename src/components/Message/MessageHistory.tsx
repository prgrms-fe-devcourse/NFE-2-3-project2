import { forwardRef, useEffect, useState } from "react";
import MessageContent from "./MessageContent";
import { useAllUserStore } from "../../store/allUserStore";
import { NavLink } from "react-router";
import defaultProfileImg from "../../../public/logo.png";
import { MESSAGE_TEXT } from "../../constants/message";

interface MessageHistoryProps {
  userId: string;
  messages: Message[] | null;
}

const MessageHistory = forwardRef<HTMLElement, MessageHistoryProps>(
  ({ userId, messages }, ref) => {
    const [userInfo, setUserInfo] = useState<User>();
    const getUser = useAllUserStore((state) => state.getUser);

    useEffect(() => {
      const fetchUserInfo = async () => {
        const user = await getUser(userId);
        setUserInfo(user);
      };

      fetchUserInfo();
    }, [userId]);

    return (
      <div className="pl-10 pr-6 grow flex flex-col overflow-hidden mt-10 mb-5">
        <section className="flex items-center mb-5 mr-4">
          <NavLink to={`/user/${userId}`} className="flex">
            <img
              src={userInfo?.image || defaultProfileImg}
              alt={userInfo?.fullName}
              className="w-8 h-8 mr-3 rounded-full profile"
            />
            <p className="text-xl dark:text-white font-semibold">
              {userInfo?.fullName}
            </p>
          </NavLink>
        </section>
        <section ref={ref} className="grow overflow-y-scroll custom-scrollbar">
          {messages?.length === 0 && (
            <div className="h-full flex items-center justify-center text-gray-54 dark:text-gray-c8">
              <p>
                {userInfo?.fullName}
                {MESSAGE_TEXT.startConversation}
              </p>
            </div>
          )}
          {messages?.map((message) => (
            <MessageContent
              key={message._id}
              isOutgoingMessage={message.receiver._id === userId}
              message={message.message}
              date={message.createdAt}
            />
          ))}
        </section>
      </div>
    );
  }
);

export default MessageHistory;
