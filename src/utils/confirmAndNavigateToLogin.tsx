import { NavigateFunction } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useModalStore } from "../store/modalStore";

const confirmAndNavigateToLogin = (navigate: NavigateFunction) => {
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  const setModal = useModalStore.getState().setModal;

  if (!isLoggedIn) {
    // 모달 상태를 설정
    setModal({
      isOpen: true,
      confirmText: "확인",
      cancelText: "취소",
      children: "로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?",
      onConfirm: () => {
        navigate("/login"); // 로그인 페이지로 이동
      },
    });
  }
};

export default confirmAndNavigateToLogin;
