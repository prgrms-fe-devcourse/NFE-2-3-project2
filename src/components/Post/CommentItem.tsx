import { NavLink } from "react-router";
import profileImg from "../../assets/profileImg.jpg";
import { useAuthStore } from "../../store/authStore";
import { useModalStore } from "../../store/modalStore";
import { useToastStore } from "../../store/toastStore";
import formatTimeAgo from "../../utils/formatTimeAgo";
import { deleteComment } from "../../api/comment";
import { POST_TOAST_MESSAGE } from "../../constants/post";

export default function CommentItem({
  comment,
  setComments,
}: {
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[] | undefined>>;
}) {
  const showToast = useToastStore((state) => state.showToast);
  const setModal = useModalStore((state) => state.setModal);
  const loggedInUser = useAuthStore((state) => state.user);
  const formattedTimeAgo = formatTimeAgo(comment.createdAt);

  const openDeleteModal = () => {
    setModal({
      isOpen: true,
      confirmText: "삭제",
      cancelText: "취소",
      children: "댓글을 삭제하시겠습니까?",
      onConfirm: async () => {
        await handleDelete(); // 삭제 작업 수행
      },
    });
  };

  const handleDelete = async () => {
    const response = await deleteComment({ id: comment._id });

    if (response && response.status === 200) {
      setComments((prev) =>
        prev!.filter((prevComment) => prevComment._id !== comment._id)
      );
      showToast(POST_TOAST_MESSAGE.deleteComment);
    } else {
      showToast(POST_TOAST_MESSAGE.deleteCommentErr);
    }
  };

  return (
    <article className="flex flex-col gap-2 mr-1">
      {/* 유저 정보 */}
      <div className="flex items-center gap-2.5">
        <NavLink
          to={`/user/${comment.author._id}`}
          className={"flex items-center gap-[13px]"}
        >
          <img
            className="w-7 h-7 rounded-full object-cover profile"
            src={comment.author?.image ?? profileImg}
            alt={comment.author.fullName}
          />
          <span className="dark:text-white">{comment.author.fullName}</span>
        </NavLink>
        <p className="text-sm text-[#888]">{formattedTimeAgo}</p>
      </div>
      {/* 댓글 내용 */}
      <div className="relative">
        <p className="text-gray-54 dark:text-gray-c8 whitespace-pre-wrap break-words">
          {comment.comment}
        </p>

        {/* 삭제 버튼 */}
        {loggedInUser?._id === comment.author._id && (
          <div className="flex justify-end mt-2">
            <button
              onClick={openDeleteModal} // 모달 열기
              className="text-red-accent text-sm"
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
