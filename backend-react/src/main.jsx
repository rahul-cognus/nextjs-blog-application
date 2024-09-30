import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ManageBlog from "./pages/blog/ManageBlog";
import Create from "./pages/blog/Create";

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  // blog
  {
    path: "/blogs",
    element: <ManageBlog />,
  },
  {
    path: "/blogs/create",
    element: <Create />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
