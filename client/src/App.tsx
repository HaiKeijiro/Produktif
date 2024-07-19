import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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

function App() {
  const [profilePhoto, setProfilePhoto] = useLocalStorage<string | null>('profilePhoto', null);
  // const [popUp, setPopUp] = useState(false);
  // const handleSearch = (event: React.KeyboardEvent) => {
  //   if (event.ctrlKey && event.key === "k") {
  //     event.preventDefault();
  //     setPopUp(!popUp);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("keydown", handleSearch);
  // });

  const location = useLocation()
  const independentPaths = ["/help"]
  const isIndependentPage = independentPaths.includes(location.pathname)

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-background-light">
        {/* {!isIndependentPage && <Sidebar />} */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {!isIndependentPage && <Topbar profilePhoto={profilePhoto} />}
          <main className="max-w-screen-2xl p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/kanbanboard" element={<KanbanBoard />} />
              <Route path="/stickynotes" element={<StickyNotes />} />
              <Route path="/settings" element={<Settings profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </main>
        </div>
      </div>
      {/* <div
        className={popUp ? "absolute bg-red-500 w-[300px] h-[400px]" : "hidden"}
      >
        holla
      </div> */}
    </>
  );
}

export default App;
