import { Outlet } from "react-router-dom";

import FullScreenLoader from "../components/loader/FullScreenLoader";
import { useEffect } from "react";
import { LOCAL_STORAGE } from "../utils/constants";
import { useUser } from "../hooks/useUsers";
import SideBar from "../components/sideBar/SideBar";
import LogoutButton from "../components/auth/logout-button";
const DashboardLayout: React.FC = () => {
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (user) localStorage.setItem(LOCAL_STORAGE.authStatus, "1");
  }, [user, isLoading]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <div className="lg:w-64 lg:h-full flex flex-col bg-white border-r shadow-lg">
        <SideBar />
        <div className="hidden lg:block p-4 mt-auto">
          <LogoutButton />
        </div>
      </div>
      <main className="bg-[#F9F9F9] flex-1 p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
