import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/authStore";

// 인증 안 된 사람만 접근 가능
export default function NotPrivate() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
