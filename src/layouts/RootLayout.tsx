import { Outlet } from "react-router";
import Header from "./Header";
import ThemeButton from "./ThemeButton";
import { useToastStore } from "../store/toastStore";
import { Toast } from "../components/common/Toast";
import Modal from "../components/common/Modal";

export default function RootLayout() {
  const { isToastVisible, toastMessage } = useToastStore();

  return (
    <>
      <Header />
      <main className="flex w-[1440px] mx-auto">
        <Outlet />
      </main>
      <ThemeButton />
      <Toast isVisible={isToastVisible} message={toastMessage} />
      <Modal />
    </>
  );
}
