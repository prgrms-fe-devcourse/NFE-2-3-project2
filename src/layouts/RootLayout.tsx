import { Outlet } from "react-router";

import Nav from "../components/Root/Nav";
import HeaderIcon from "../components/Root/HeaderIcon";

export default function RootLayout() {
  return (
    <div className="flex flex-col w-screen h-screen mx-auto">
      {/* Header */}
      <HeaderIcon />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto min-w-[767px] no-scrollbar">
        <Outlet />
      </main>
      <Nav />
    </div>
  );
}
