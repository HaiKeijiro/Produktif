import React, { useEffect } from "react";
import { Search } from "../components/Icons";

interface PopUpSearchProps {
  isSearch: boolean;
  toggleSearch: () => void;
}

const PopUpSearch: React.FC<PopUpSearchProps> = ({
  isSearch,
  toggleSearch,
}) => {
  useEffect(() => {
    const handleSearch = (event: KeyboardEvent) => {
      if ((event.ctrlKey && event.key === "k") || event.key === "K") {
        event.preventDefault();
        toggleSearch();
      }

      if (event.key === "Escape") {
        toggleSearch();
      }
    };

    // Add event listener to the window
    window.addEventListener("keydown", handleSearch);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleSearch);
    };
  }, [toggleSearch]);

  return (
    <div
      className={
        isSearch
          ? "bg-button-light absolute w-3/5 h-3/5 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
          : "hidden"
      }
    >
      <div className="flex items-center p-4 gap-x-4 text-text-dark font-medium">
        <Search />
        <input
          type="text"
          maxLength={50}
          placeholder="Seach data"
          className="w-full bg-transparent outline-none"
        />
        <button
          className="bg-kanban-columnBg button text-xs"
          onClick={toggleSearch}
        >
          ESC
        </button>
      </div>
    </div>
  );
};

export default PopUpSearch;
