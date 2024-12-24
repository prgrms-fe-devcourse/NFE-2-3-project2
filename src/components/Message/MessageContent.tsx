import formatMessageTime from "../../utils/formatMessageTime";

interface MessageContentProps {
  isOutgoingMessage: boolean;
  date: string;
  message: string;
}

const MessageContent = ({
  isOutgoingMessage,
  date,
  message,
}: MessageContentProps) => {
  return (
    <article className="border-b border-gray-c8 py-4 px-3">
      <div className="flex items-center justify-between mb-1">
        {isOutgoingMessage ? (
          <span className="text-highlight font-medium">보낸 메시지</span>
        ) : (
          <span className="text-[#12AA5F] font-medium">받은 메시지</span>
        )}
        <span className="text-sm text-gray-6c dark:text-gray-ee">
          {formatMessageTime(date)}
        </span>
      </div>
      <p className="text-gray-6c dark:text-gray-ee whitespace-pre-wrap">
        {message}
      </p>
    </article>
  );
};
export default MessageContent;
