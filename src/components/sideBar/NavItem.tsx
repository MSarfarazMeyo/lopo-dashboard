import React from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  link: string;
  title: string;
  icon: any;
  name: any;
  activeNavName: any;
  setActiveNavName: (name: any) => void;
};

const NavItem: React.FC<NavItemProps> = ({
  link,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  return (
    <NavLink
      to={link}
      className={`${
        name === activeNavName
          ? "font-bold text-primary text-[#8103CE] "
          : "font-semibold text-[#A5A5A5]"
      } flex items-center gap-x-2 py-2 text-lg`}
      onClick={() => setActiveNavName(name)}
    >
      {icon}
      {title}
    </NavLink>
  );
};

export default NavItem;
