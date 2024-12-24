import LogoButton from "../components/Header/LogoButton";
import LogInButton from "../components/Header/LogInButton";
import { useAuthStore } from "../store/authStore";
import NotificationButton from "../components/Header/NotificationButton";
import NewPostButton from "../components/Header/NewPostButton";
import ProfileButton from "../components/Header/ProfileButton";
import SearchBar from "../components/Header/SearchBar";

export default function Header() {
  const { user, isLoggedIn } = useAuthStore();

  return (
    <header className="sticky top-0 border-b border-gray-ee dark:border-gray-ee/50 min-w-[1440px] w-full h-fit z-30 bg-white dark:bg-gray-22">
      <div className="flex justify-between items-center w-[1440px] h-[68px] px-10 mx-auto">
        <LogoButton />
        {isLoggedIn ? (
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-3">
            <SearchBar />
            <NotificationButton />
            <NewPostButton />
            <ProfileButton profileImage={user?.image} />
          </div>
        ) : (
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-3">
            <SearchBar />
            <LogInButton />
          </div>
        )}
      </div>
    </header>
  );
}
