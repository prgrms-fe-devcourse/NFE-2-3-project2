import images from "../assets";
import { Link, Outlet, useLocation } from "react-router";

export default function AuthLayout() {
  const { pathname } = useLocation();
  const path = pathname.split("/").pop();
  const title = {
    signIn: "로그인",
    signUp: "회원가입",
  }[path!];

  return (
    <>
      <header className="w-full h-[100px] border-b border-whiteDark dark:border-gray bg-white dark:bg-black dark:text-white flex items-center justify-center">
        <Link to={"/"}>
          <img src={images.Logo} alt="main logo" />
        </Link>
      </header>
      <article className="w-full min-h-screen flex py-[162px] md:py-[80px] justify-center bg-white text-black dark:bg-black dark:text-white">
        <section className="w-[494px] h-auto flex flex-col items-center gap-[60px] md:mr-5 md:ml-5 ">
          <h1 className="font-bold text-[32px]">{title}</h1>
          <Outlet />
        </section>
      </article>
    </>
  );
}
