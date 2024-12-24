import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { useModalStore } from "../store/modalStore";

function Private() {
  const navigate = useNavigate();
  const [show, setIsShow] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setModal = useModalStore((state) => state.setModal);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handleLogout = () => {
      setIsLoggingOut(true);
      navigate("/");
    };

    window.addEventListener("logout", handleLogout);

    return () => {
      window.removeEventListener("logout", handleLogout);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn && !isLoggingOut) {
      setModal({
        isOpen: true,
        confirmText: "로그인",
        cancelText: "취소",
        children: "로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?",
        onConfirm: () => {
          navigate("/login"); // 로그인 페이지로 이동
        },
        onClose: () => {
          navigate(-1);
        },
      });
      return;
    }
    setIsShow(true);
  }, [isLoggedIn]);

  return <>{show && <Outlet />}</>;
}

export default Private;
