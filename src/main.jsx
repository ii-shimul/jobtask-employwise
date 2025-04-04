import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import LoginCheck from "./pages/LoginCheck/LoginCheck.jsx";
import UsersList from "./pages/UsersList/UsersList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/users",
        element: (
          <LoginCheck>
            <UsersList/>
          </LoginCheck>
        ),
      },
      {
        path: "/users/:id",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
