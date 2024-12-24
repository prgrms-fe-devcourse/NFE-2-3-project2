import { useNavigate } from "react-router";
import { useState } from "react";
import { useThemeStore } from "../../store/themeStore";
import { deletePost } from "../../api/post";
import MoreIcon from "../../assets/MoreIcon";
import Dropdown from "../common/Dropdown";
import { useModalStore } from "../../store/modalStore";
import { useToastStore } from "../../store/toastStore";
import { POST_TOAST_MESSAGE } from "../../constants/post";

export default function MoreButton({ post }: { post: Post }) {
  const navigate = useNavigate();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [isOpen, setIsOpen] = useState(false);
  const setModal = useModalStore((state) => state.setModal);
  const showToast = useToastStore((state) => state.showToast);

  const openDeleteModal = () => {
    setModal({
      isOpen: true,
      confirmText: "삭제",
      cancelText: "취소",
      children: "포스팅을 삭제하시겠습니까?",
      onConfirm: async () => {
        await handleDeletePost(); // 삭제 함수 실행
      },
    });
  };

  const handleDeletePost = async () => {
    const result = await deletePost(post._id);

    if (result) {
      showToast(POST_TOAST_MESSAGE.deletePost);
      navigate(`/channels/${post.channel.name}`);
    } else {
      showToast(POST_TOAST_MESSAGE.deletePostErr);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="w-[36px] h-[36px] flex justify-center items-center rounded-full hover:bg-gray-ee/80 dark:hover:bg-white/10 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <MoreIcon color={isDarkMode ? "#eee" : undefined} />
      </button>
      <Dropdown
        className="w-24 right-0"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <button
          type="button"
          className="py-1.5 text-center border-b dark:border-gray-ee/50 hover:bg-gray-ee/80 dark:hover:bg-white/10 transition-colors"
          onClick={() => navigate(`/posts/${post?._id}/edit`)}
        >
          수정
        </button>
        <button
          type="button"
          className="py-1.5 text-center text-red-accent hover:bg-red-accent dark:hover:bg-red-accent/80 hover:text-white transition-colors"
          onClick={openDeleteModal}
        >
          삭제
        </button>
      </Dropdown>
    </div>
  );
}
