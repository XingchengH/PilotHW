import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import ErrorPage from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import UserLayout from "./layout/UserLayout";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },

        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "user",
              element: <UserLayout />,
              children: [
                {
                  index: true,
                  element: <User />,
                },
                {
                  path: "profile",
                  element: <UserProfile />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
