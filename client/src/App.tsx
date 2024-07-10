import { Back } from "./components/Icons";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
function App() {
  return (
    <>
      <div className="bg-background-light">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Topbar />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 bg-green-500">
                
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
