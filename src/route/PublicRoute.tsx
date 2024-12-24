import { Outlet } from "react-router";
import { useAuth } from "../stores/authStore";
import { Navigate } from "react-router";
import Lottie from "react-lottie-player";
import lottieJson from "../assets/lottie/loading-b.json";

// 로그인이 되어있으면 메인페이지로 이동
// 로그인, 회원가입 페이지에 적용
export default function PublicRoute() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);

  // 로그인 초기상태는 null이므로, 처음에는 로딩화면을 띄워주고
  // 로그인 판단 후, 이동 설정
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
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
}
