import React from "react";
import { Time, Moon, Search } from "../components/Icons"
import userImg from "../assets/userImg.jpg";

const Topbar: React.FC = () => {
  return (
    <div className="h-[10%] bg-primary-light text-text-light flex items-center justify-between px-5">
      <div className="w-[25%] h-[70%] bg-background-light flex justify-between items-center rounded-md px-2">
        <div className="flex gap-x-2">
          <Search />
          <p>Quick search...</p>
        </div>
        <span className="font-medium text-[#7888A1]">Ctrl + K</span>
      </div>
      <div className="flex items-center gap-x-5">
        <Moon />
        <Time />
        <div className="flex items-center gap-x-5">
          <h1>Ryan Rb</h1>
          <img
            className="w-[50px] h-[50px] bg-cover rounded-full"
            src={userImg}
            alt="profile.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
