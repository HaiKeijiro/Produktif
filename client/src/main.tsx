import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar.tsx";

// Pages
import StickyNotes from "./pages/StickyNotes.tsx";
import KanbanBoard from "./pages/KanbanBoard.tsx";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/kanbanboard",
    element: <KanbanBoard />,
  },
  {
    path: "/stickynotes",
    element: <StickyNotes />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
