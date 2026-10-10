import { createBrowserRouter } from "react-router";
import Root from "./Root";
import HomePage from "./HomePage";
import CertificatesPage from "./CertificatesPage";
import ProjectsPage from "./ProjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "certificates", Component: CertificatesPage },
      { path: "projects", Component: ProjectsPage },
    ],
  },
]);
