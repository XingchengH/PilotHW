import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import ErrorPage from "./pages/Error";
import Dashboard from "./components/Dashboard";
import User from "./pages/User";
import UserLayout from "./pages/UserLayout";
import UserProfile from "./pages/UserProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Dashboard /> },
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
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
