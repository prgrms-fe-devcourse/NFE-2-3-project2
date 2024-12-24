import { useEffect, useState } from "react";
import { getChannels } from "../../api/channel";
import { useTriggerStore } from "../../stores/triggerStore";
import { twMerge } from "tailwind-merge";
import { NavLink } from "react-router";

export default function Navbar() {
  const targetLink = useTriggerStore((state) => state.targetLink);
  const [menus, setMenus] = useState<ChannelItem[]>([]);

  useEffect(() => {
    const handleGetMenus = async () => {
      const data = await getChannels();
      setMenus(
        data.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        })
      );
    };
    handleGetMenus();
  }, []);

  return (
    <nav className="w-full flex-1 flex-grow max-h-[calc(100vh-296px)] md:scroll overflow-y-auto md:p-4 md:border-b md:border-whiteDark md:dark:border-gray">
      <ul className="w-full flex flex-col gap-5 md:flex-row md:justify-center">
        {menus.map((menu) => (
          <li key={menu._id}>
            <NavLink
              to={`/board/${menu.name}?id=${menu._id}`}
              className={({ isActive }) =>
                twMerge(
                  isActive
                    ? "font-bold text-main"
                    : "text-black dark:text-white hover:text-main dark:hover:text-main transition-all",
                  targetLink === menu.name &&
                    "font-bold text-main dark:text-main"
                )
              }
            >
              {menu.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
