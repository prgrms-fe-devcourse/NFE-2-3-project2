import { useEffect, useRef, useState } from "react";
import { createComment } from "../../api/comment";
import { useNavigate, useParams } from "react-router";
import confirmAndNavigateToLogin from "../../utils/confirmAndNavigateToLogin";
import { createNotification } from "../../api/notification";
import { useAuthStore } from "../../store/authStore";
import { POST_PLACEHOLDER } from "../../constants/post";

export default function CommentWrite({
  postAuthorId,
  setComments,
  setIsSubmit,
}: {
  postAuthorId: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[] | undefined>>;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = useState("");
  const checkIsMyUserId = useAuthStore((state) => state.checkIsMyUserId);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    // 높이가 5줄까지만 늘어나도록 설정
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto"; // 기존 높이 초기화
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      24 * 5
    )}px`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = textareaRef.current!.value;
    const addedComment = await createComment({ comment, postId });

    if (addedComment) {
      if (!checkIsMyUserId(postAuthorId)) {
        await createNotification({
          notificationType: "COMMENT",
          notificationTypeId: addedComment._id,
          userId: postAuthorId,
          postId: addedComment.post,
        });
      }
      setComments((prev) => [...prev!, addedComment]);
      setComment("");
      setIsSubmit(true);
      textareaRef.current!.value = "";
      adjustHeight();
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-end w-full border-t border-gray-ee dark:border-gray-ee/50 gap-3 mt-5 px-6"
    >
      <div className="w-full border border-gray-c8 p-4 pr-[2px] mt-[23px] rounded-[15px] bg-white/20 focus-within:border-primary">
        <textarea
          ref={textareaRef}
          rows={1}
          className="block w-full h-[47px] bg-transparent resize-none custom-scrollbar overflow-y-scroll"
          onChange={handleChange}
          onClick={() => confirmAndNavigateToLogin(navigate)}
          placeholder={POST_PLACEHOLDER.comment}
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={!comment}
        className="bg-primary primary-btn rounded-lg w-[67px] py-1"
      >
        등록
      </button>
    </form>
  );
}
