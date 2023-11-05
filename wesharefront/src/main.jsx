import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.css";
import store from "./store/store.js";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import SignPage from "./pages/SignPage.jsx";
import Signin from "./components/Signin.jsx";
import SignUp from "./components/SignUp.jsx";

import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" replace />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/home",
        element: <div>Home</div>,
        errorElement: <ErrorPage />,
      },
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
        element: (
          <SignPage>
            <Signin />
          </SignPage>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
        element: (
          <SignPage>
            <SignUp />
          </SignPage>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
