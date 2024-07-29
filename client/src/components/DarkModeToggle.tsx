import React from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { Moon, Sun } from "./Icons";

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button onClick={toggleDarkMode} className="p-2">
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
};

export default DarkModeToggle;
