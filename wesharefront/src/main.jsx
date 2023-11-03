import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/explore",
        element: <div>Explore</div>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/following",
        element: <div>following</div>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile",
        element: <div>profile</div>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signin",
        element: <div>signin</div>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
        element: <div>signup</div>,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
