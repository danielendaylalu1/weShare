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

import { useSelector } from "react-redux/es/hooks/useSelector.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
const Main = () => {
  const { user } = useSelector((state) => state.user);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
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
          element:
            user === null ? (
              <Navigate to="/signin" replace />
            ) : (
              <div>following</div>
            ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/profile",
          element:
            user === null ? (
              <Navigate to="/signin" replace />
            ) : (
              <div>profile</div>
            ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/signin",
          element:
            user === null ? (
              <SignPage>
                <Signin />
              </SignPage>
            ) : (
              <Navigate to="/home" replace />
            ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/signup",
          element:
            user === null ? (
              <SignPage>
                <SignUp />
              </SignPage>
            ) : (
              <Navigate to="/home" replace />
            ),
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);
