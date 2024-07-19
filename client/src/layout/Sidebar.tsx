import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "/logo.svg";
import {
  Dashboard,
  Info,
  Kanban,
  Setting,
  StickyNote,
} from "../components/Icons";

const Sidebar = () => {
  return (
    <nav className="relative flex flex-col justify-between w-1/5 h-full text-text-light bg-primary-light">
      <div>
        <img src={logo} alt="logo.svg" className="w-2/5 mx-auto pt-4 py-14" />
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
          isActive ? "bg-button-light text-white rounded-lg" : ""
        }`
      }
    >
      {icon} {text}
    </NavLink>
  </li>
);

export default Sidebar;
