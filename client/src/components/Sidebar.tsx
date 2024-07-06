import React from "react";
import logo from "/logo.svg";
import { Dashboard, Info, Kanban, Setting, StickyNote } from "./Icons";

const Sidebar: React.FC = () => {
  return (
    <div className="w-[25%] h-[550px] bg-primary-light text-text-light">
      <img src={logo} alt="logo.svg" className="w-[100px] mx-auto pt-2 py-10" />
      <div className="flex flex-col justify-between h-[70%]">
        <div className="space-y-8">
          <h1>
            <Dashboard /> Dashboard
          </h1>
          <h1>
            <Kanban /> Kanban Board
          </h1>
          <h1>
            <StickyNote /> Sticky Notes
          </h1>
        </div>
        <div className="space-y-8">
          <hr />
          <h1>
            <Setting /> Settings
          </h1>
          <h1>
            <Info /> Help Center
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
