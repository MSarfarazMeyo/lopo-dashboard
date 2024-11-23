import React from "react";
import { Modal } from "antd";
import { useLogout } from "../../hooks/useLogout";

const LogoutButton = () => {
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    Modal.confirm({
      title: "Are you sure you want to log out?",
      content: "You will need to log in again to access your account.",
      okText: "Yes, Log Out",
      cancelText: "Cancel",
      onOk: () => {
        logout(); // Trigger the logout function on confirmation
      },
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
