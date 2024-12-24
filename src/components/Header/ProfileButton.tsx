import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";
import Dropdown from "../common/Dropdown";
import defaultProfileImg from "../../../public/logo.png";
import { useModalStore } from "../../store/modalStore";
import { useToastStore } from "../../store/toastStore";

interface ProfileButtonProps {
  profileImage?: string | null;
}

export default function ProfileButton({ profileImage }: ProfileButtonProps) {
  const privateRoutes = ["/write", "/mypage", "/message", "/edit"]; // 로그인 상태에서만 접근 가능한 페이지
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const setModal = useModalStore((state) => state.setModal);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMyPageClick = () => {
    navigate("/mypage");
    setIsOpen(false);
  };

  const handleMessageClick = () => {
    navigate("/message");
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    const currentPath = location.pathname;
    if (privateRoutes.some((route) => currentPath.includes(route))) {
      setModal({
        isOpen: true,
        confirmText: "로그아웃",
        cancelText: "취소",
        children:
          "로그아웃하면 이 페이지를 떠나게 됩니다.\n그래도 로그아웃하시겠습니까?",
        onConfirm: async () => {
          logout(); // 삭제 작업 수행
          showToast("로그아웃 되었습니다.");
          navigate("/");
        },
      });
      return;
    }

    logout(); // 삭제 작업 수행
    showToast("로그아웃 되었습니다.");
    setIsOpen(false);
  };

  return (
    <section ref={ref} className="relative">
      <img
        className="w-[44px] h-[44px] rounded-full profile-shadow profile cursor-pointer"
        src={profileImage || defaultProfileImg}
        alt="프로필"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      />
      <Dropdown
        className="w-[158px] p-3 top-12 right-0"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <button
          type="button"
          className="flex justify-center items-center self-stretch relative gap-2.5 px-5 py-2.5 rounded-lg hover:bg-[#fbefbf] hover:dark:bg-gray-44 group"
          onClick={handleMyPageClick}
        >
          <p className="text-base text-left text-black dark:text-gray-ee group-hover:text-black group-hover:dark:text-gray-22">
            마이페이지
          </p>
        </button>
        <button
          type="button"
          className="flex justify-center items-center self-stretch relative gap-2.5 px-5 py-2.5 rounded-lg hover:bg-[#fbefbf] hover:dark:bg-gray-44 group"
          onClick={handleMessageClick}
        >
          <p className="text-base text-left text-black dark:text-gray-ee group-hover:text-black group-hover:dark:text-gray-22">
            메시지함
          </p>
        </button>
        <button
          type="button"
          className="flex justify-center items-center self-stretch relative gap-2.5 px-5 py-2.5 rounded-lg hover:bg-[#fbefbf] hover:dark:bg-gray-44 group"
          onClick={handleLogoutClick}
        >
          <p className="text-base text-left text-black dark:text-gray-ee group-hover:text-black group-hover:dark:text-gray-22">
            로그아웃
          </p>
        </button>
      </Dropdown>
    </section>
  );
}
