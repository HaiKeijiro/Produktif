import React from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { Moon, Sun } from "./Icons";

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button onClick={toggleDarkMode} className="p-2 outline-none">
      {isDarkMode ? (
        <div className="text-neutral-light">
          <Sun />
        </div>
      ) : (
        <Moon />
      )}
    </button>
  );
};

export default DarkModeToggle;
