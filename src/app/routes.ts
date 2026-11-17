import { createBrowserRouter } from "react-router";
import Root from "./Root";
import HomePage from "./HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      {
        path: "certificates",
        lazy: async () => ({
          Component: (await import("./CertificatesPage")).default,
        }),
      },
      {
        path: "projects",
        lazy: async () => ({
          Component: (await import("./ProjectsPage")).default,
        }),
      },
    ],
  },
]);
