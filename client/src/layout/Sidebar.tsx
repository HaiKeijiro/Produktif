import React from "react";
import { NavLink } from "react-router-dom";
import {
  Dashboard,
  Info,
  Kanban,
  Setting,
  StickyNote,
} from "../components/Icons";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <nav
      className={`relative hidden md:flex flex-col justify-between h-full text-text-light border-r dark:text-white transition-all duration-300 ${
        isOpen ? `w-1/5 opacity-100` : `w-0 opacity-0`
      }`}
    >
      <div>
        <div className="grid pt-4 pb-14">
          <h1 className="text-4xl font-medium mx-auto">Produktif</h1>
        </div>
        <ul className="w-11/12 m-auto">
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
        <ul className="w-11/12 m-auto py-5">
          <SidebarLink to="/settings" icon={<Setting />} text="Settings" />
          <SidebarLink to="/help" icon={<Info />} text="Help Center" />
        </ul>
      </div>
    </nav>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, text }) => (
  <li className="rounded-md">
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex gap-x-2 px-5 py-3 ${
          isActive ? "bg-[#F4F4F4] border-[#C6C7F8] dark:bg-[#272727] rounded-lg" : ""
        }`
      }
    >
      {icon} {text}
    </NavLink>
  </li>
);

export default Sidebar;
