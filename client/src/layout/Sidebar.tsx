import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "/logo.svg";
import {
  Back,
  Dashboard,
  Info,
  Kanban,
  Right,
  Setting,
  StickyNote,
} from "../components/Icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const hideSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`relative flex flex-col justify-between h-full text-text-light bg-primary-light transition-all duration-300 ${
        isOpen ? "w-1/5" : "w-[10%]"
      }`}
    >
      <div>
        <img src={logo} alt="logo.svg" className="w-2/5 mx-auto pt-4 py-14" />
        <ul className={`${isOpen ? "w-11/12 m-auto" : "w-full"}`}>
          <SidebarLink to="/dashboard" icon={<Dashboard />} text="Dashboard" />
          <SidebarLink
            to="/kanbanboard"
            icon={<Kanban />}
            text="Kanban Board"
          />
          <SidebarLink
            to="/stickynotes"
            icon={<StickyNote />}
            text="Sticky Notes"
          />
        </ul>
      </div>
      <div>
        <hr />
        <ul className="py-5">
          <SidebarLink to="/settings" icon={<Setting />} text="Settings" />
          <SidebarLink to="/help" icon={<Info />} text="Help Center" />
          <SidebarLink to="/help" icon={<Info />} />
        </ul>
      </div>
      <button
        onClick={hideSidebar}
        className="absolute right-0 top-[35%] bg-red-500 p-2"
      >
        {isOpen ? <Back /> : <Right />}
      </button>
    </nav>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text?: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, text }) => (
  <li className="rounded-md">
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex gap-x-2 px-5 py-3 ${
          isActive ? "bg-button-light text-white rounded-lg" : ""
        }`
      }
    >
      {icon} {text}
    </NavLink>
  </li>
);

export default Sidebar;
