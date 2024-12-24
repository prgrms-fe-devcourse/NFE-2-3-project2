import { Route, useLocation, Routes } from "react-router";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import AuthLayout from "./layouts/AuthLayout";
import User from "./pages/User";
import Posting from "./pages/Posting";
import PublicRoute from "./route/PublicRoute";
import PostDetail from "./pages/PostDetail";
import PrivateRoute from "./route/PrivateRoute";
import ReviewPost from "./pages/ReviewPost";
import MyPage from "./pages/MyPage";
import { useEffect } from "react";
import { verifyUser } from "./utils/verifyUser";
import Main from "./pages/Main";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    verifyUser();
  }, [location]);
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/records" element={<Home key={location.key} />} />
          <Route path="/protein" element={<Home key={location.key} />} />
          <Route path="/routine" element={<Home key={location.key} />} />
          <Route path="/gymreview" element={<ReviewPost />} />
          <Route path="/records/:post_id" element={<PostDetail />} />
          <Route path="/protein/:post_id" element={<PostDetail />} />
          <Route path="/routine/:post_id" element={<PostDetail />} />
          <Route path="/gymreview/:post_id" element={<PostDetail />} />

          <Route path="/user/:user_id" element={<User />} />
        </Route>

        {/* 로그인 필요햔 기능 */}
        <Route element={<PrivateRoute />}>
          <Route element={<RootLayout />}>
            <Route path="/posting" element={<Posting />} />
            <Route path="/myprofile" element={<MyPage />} />
            <Route path="/myprofile/posts/:post_id" element={<PostDetail />} />
          </Route>
        </Route>

        {/* 로그인시 redirect */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Route>

        {/* 에러 페이지 */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}
