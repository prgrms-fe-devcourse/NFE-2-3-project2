import { useSearchParams } from "react-router";
import MessageSidebar from "../components/Message/MessageSidebar";
import { useEffect, useRef } from "react";
import Loading from "../components/common/Loading";
import MessageHistory from "../components/Message/MessageHistory";
import MessageForm from "../components/Message/MessageForm";
import { checkMessageSeen } from "../api/message";
import useGetMessageList from "../hooks/useGetMessageList";
import useGetConversationWithUser from "../hooks/useGetConversationWithUser";
import { MESSAGE_TEXT } from "../constants/message";

export default function Message() {
  const messageHistoryRef = useRef<HTMLElement>(null);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user") ?? "";
  const {
    conversation,
    loading: conversationLoading,
    error: conversationError,
    refetch: conversationRefetch,
  } = useGetConversationWithUser(userId);
  const {
    messageList,
    loading: messageListLoading,
    error: messageListError,
    refetch: messageListRefetch,
  } = useGetMessageList();

  useEffect(() => {
    if (userId) checkMessageSeen(userId);
  }, [conversation]);

  if (!userId)
    return (
      <div className="flex w-full screen-100vh">
        <section className="grow h-full flex flex-col">
          {!userId && (
            <p className="w-full text-lg text-center text-gray-54 dark:text-gray-c8 mt-36">
              {MESSAGE_TEXT.noSelected}
            </p>
          )}
        </section>
        <MessageSidebar
          messageList={messageList}
          loading={messageListLoading}
          error={messageListError}
        />
      </div>
    );

  return (
    <div className="flex w-full screen-100vh">
      <section className="grow h-full flex flex-col">
        {conversationLoading ? (
          <Loading />
        ) : conversationError ? (
          <p className="w-full text-lg text-center mt-36 text-gray-54 dark:text-gray-c8">
            {MESSAGE_TEXT.conversationErr}
          </p>
        ) : (
          <>
            <MessageHistory
              userId={userId}
              messages={conversation}
              ref={messageHistoryRef}
            />
            <MessageForm
              userId={userId}
              conversationRefetch={conversationRefetch}
              messageListRefetch={messageListRefetch}
              messageHistoryRef={messageHistoryRef}
            />
          </>
        )}
      </section>
      <MessageSidebar
        messageList={messageList}
        loading={messageListLoading}
        error={messageListError}
      />
    </div>
  );
}
