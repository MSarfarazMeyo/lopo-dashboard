"use client";

import { useLogout } from "../../services/auth";


const LogoutButton = () => {
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full rounded-10 bg-white px-[18px] py-4 text-left text-lg font-semibold hover:text-blue"
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
