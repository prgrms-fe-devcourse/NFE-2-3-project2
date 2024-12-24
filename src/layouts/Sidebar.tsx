import { Outlet } from "react-router";
import ChannelList from "../components/Sidebar/ChannelList";
import UserList from "../components/Sidebar/UserList";
import { useEffect } from "react";
import { useAllUserStore } from "../store/allUserStore";

export default function Sidebar() {
  const fetchUsers = useAllUserStore((state) => state.fetchUsers);

  useEffect(() => {
    const intervalId = setInterval(fetchUsers, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <aside className="flex flex-col sticky top-[68px] screen-100vh w-[300px] min-w-[300px] p-7 gap-5 justify-between border-r border-gray-ee dark:border-gray-ee/50">
        <ChannelList />
        <UserList />
      </aside>
      <Outlet />
    </>
  );
}
