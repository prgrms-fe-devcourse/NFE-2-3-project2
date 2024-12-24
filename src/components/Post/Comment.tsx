import { useEffect, useRef, useState } from "react";
import CommentItem from "./CommentItem";
import CommentWrite from "./CommentWrite";
import { POST_TEXT } from "../../constants/post";

export default function Comment({
  postAuthorId,
  comments,
  setComments,
}: {
  postAuthorId: string;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[] | undefined>>;
}) {
  const commentsRef = useRef<HTMLDivElement>(null);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (isSubmit && commentsRef.current) {
      commentsRef.current.scrollTo({
        top: commentsRef.current.scrollHeight,
        behavior: "smooth",
      });
      setIsSubmit(false);
    }
  }, [isSubmit]);

  return (
    <section className="sticky top-[69px] flex flex-col min-w-[420px] w-[420px] screen-100vh py-[28px] border-l border-gray-ee dark:border-gray-ee/50">
      <p className="mb-[22px] font-medium text-xl px-6">
        댓글 {comments.length}개
      </p>
      <div className="flex flex-col w-full grow overflow-hidden">
        {comments.length === 0 ? (
          <p className="flex items-center justify-center text-center h-full text-gray-54 dark:text-gray-c8 mb-[115px] whitespace-pre-wrap leading-10">
            {POST_TEXT.noComment}
          </p>
        ) : (
          <div
            ref={commentsRef}
            className="flex flex-col gap-5 overflow-y-scroll custom-scrollbar ml-6 mr-1"
          >
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                setComments={setComments}
              />
            ))}
          </div>
        )}
      </div>
      <CommentWrite
        postAuthorId={postAuthorId}
        setComments={setComments}
        setIsSubmit={setIsSubmit}
      />
    </section>
  );
}
