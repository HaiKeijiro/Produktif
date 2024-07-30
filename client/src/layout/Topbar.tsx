import React from "react";
import { Search } from "../components/Icons";
import { DarkModeProvider } from "../context/DarkModeContext";
import DarkModeToggle from "../components/DarkModeToggle";

interface TopbarProps {
  profilePhoto: string | null;
  toggleSearch: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ profilePhoto, toggleSearch }) => {
  return (
    <div className="h-[10%] border-y dark:text-[#5B5B5B] flex items-center justify-between px-5">
      <div
        className="w-[25%] h-[70%] bg-[#F3F3F3] dark:bg-[#323232] text-[#C8C8C8] font-medium flex justify-between items-center rounded-md px-2 cursor-pointer"
        onClick={toggleSearch}
      >
        <div className="flex gap-x-2">
          <Search />
          <p>Quick search...</p>
        </div>
        <span>Ctrl + K</span>
      </div>
      <div className="flex items-center gap-x-5">
        <DarkModeProvider>
          <DarkModeToggle />
        </DarkModeProvider>
        <div className="flex items-center gap-x-5">
          <h1 className="dark:text-neutral-light">Ryan Rb</h1>
          <img
            className="w-[50px] h-[50px] bg-cover rounded-full my-2"
            src={profilePhoto || ""}
            alt="profile.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
