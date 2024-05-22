import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "@/pages/user/HomePage/HomePage";
import ProjectsPage from "./pages/user/ProjectsPage/ProjectsPage";
import DashboardPage from "./pages/admin/DashboardPage/DashboardPage";
import LoginPage from "./pages/loginPage/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

import { PrivateRoute } from "./components/common/PrivateRoute/PrivateRoute";

import "@/styles/global.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <NotFoundPage/> },
  { path: "/projects", element: <ProjectsPage/> },
  { path: "/admin", element: <LoginPage/> },
  { path: "/dashboard", element: <PrivateRoute><DashboardPage/></PrivateRoute> },
]);
 
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
