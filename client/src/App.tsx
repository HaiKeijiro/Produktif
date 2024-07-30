import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";

// Layout
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";

// Pages
import StickyNotes from "./pages/StickyNotes";
import KanbanBoard from "./pages/KanbanBoard";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import useLocalStorage from "./hooks/useLocalStorage";
import { Back, Open } from "./components/Icons";
import PopUpSearch from "./pages/PopUpSearch";

function App() {
  const [profilePhoto, setProfilePhoto] = useLocalStorage<string | null>(
    "profilePhoto",
    null
  );
  const [hideSidebar, setHideSidebar] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  const handleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };

  const toggleSearch = () => {
    setIsSearch((prev) => !prev);
  };

  const location = useLocation();
  const independentPaths = ["/help"];
  const isIndependentPage = independentPaths.includes(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-neutral-black">
      {!isIndependentPage && (
        <PopUpSearch isSearch={isSearch} toggleSearch={toggleSearch} />
      )}
      {!isIndependentPage && <Sidebar isOpen={hideSidebar} />}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {!isIndependentPage && (
          <Topbar profilePhoto={profilePhoto} toggleSearch={toggleSearch} />
        )}
        <main className="max-w-screen-2xl">
          {/* Hide and Open Sidebar */}
          <button
            onClick={handleSidebar}
            className="absolute left-0 top-1/2 w-[1.5%] h-[8%] bg-neutral-black text-white dark:bg-[#323232] rounded-r-xl z-10"
          >
            {hideSidebar ? <Back /> : <Open />}
          </button>
          {/* Pages */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kanbanboard" element={<KanbanBoard />} />
            <Route path="/stickynotes" element={<StickyNotes />} />
            <Route
              path="/settings"
              element={
                <Settings
                  profilePhoto={profilePhoto}
                  setProfilePhoto={setProfilePhoto}
                />
              }
            />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
