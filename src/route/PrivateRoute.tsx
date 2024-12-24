import { Outlet } from "react-router";
import { useAuth } from "../stores/authStore";
import { Navigate } from "react-router";
import Lottie from "react-lottie-player";
import lottieJson from "../assets/lottie/loading-b.json";

// 로그인이 안되어있으면 로그인 페이지로 이동
// 아직 어느 페이지에 적용할지 미정

export default function PrivateRoute() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  if (isLoggedIn === null)
    return (
      <div className="flex items-center justify-center w-full h-screen bg-white/80">
        <Lottie
          className="w-[130px] h-[130px]"
          loop
          animationData={lottieJson}
          play
        />
      </div>
    );
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
