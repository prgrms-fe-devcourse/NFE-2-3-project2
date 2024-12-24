import { useEffect } from "react";
import { useLocation } from "react-router";

import FooterNavLink from "../FooterNavLink";
import { useCookie } from "../../hooks/useCookie";
import images from "../../assets/images/importImages";
import { useNotificationStore } from "../../stores/notificationStore";

export default function Nav() {
  let isLoggedIn = useCookie();

  const location = useLocation();

  const hiddenPaths = ["/my-course-builder"];
  const shouldHideFooter = hiddenPaths.includes(location.pathname);

  const startNotification = useNotificationStore(
    (state) => state.startNotification
  );
  const stopNotification = useNotificationStore(
    (state) => state.stopNotification
  );

  const getIcon = (
    path: string,
    defaultIcon: keyof typeof images,
    activeIcon: keyof typeof images
  ) => {
    if (path === "/login") return defaultIcon;
    return location.pathname === path ? activeIcon : defaultIcon;
  };

  useEffect(() => {
    const isLoggedIn = useCookie();
    if (isLoggedIn) {
      startNotification();
    } else {
      stopNotification();
    }
  }, [useCookie()]);

  return (
    <footer
      className={`fixed bottom-0 w-full h-20  shadow-lg bg-white border-zinc-200 z-50 ${
        shouldHideFooter ? "hidden" : ""
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <nav className="relative flex items-center justify-around w-full h-full max-w-3xl px-4">
          <FooterNavLink
            to="/category"
            icon={getIcon("/category", "category_icon", "clickcategory_icon")}
            label="카테고리"
          />
          <FooterNavLink
            to="/"
            icon={getIcon("/", "feed_icon", "clickfeed_icon")}
            label="피드"
          />
          <FooterNavLink
            to={
              isLoggedIn
                ? "/my-course-builder/viewer"
                : "/login?page=my-course-builder/viewer"
            }
            icon={getIcon(
              "/my-course-builder/viewer",
              "create_icon",
              "clickcreate_icon"
            )}
            label="마이 코스"
          />
          <FooterNavLink
            to={isLoggedIn ? "/my-page" : "/login?page=my-page"}
            icon={getIcon("/my-page", "mypage_icon", "clickmypage_icon")}
            label="마이페이지"
          />
        </nav>
      </div>
    </footer>
  );
}
