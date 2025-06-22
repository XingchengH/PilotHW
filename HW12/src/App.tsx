import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/RootLayout";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Todos from "./pages/Todos";
import UserRoot from "./pages/UsersRoot";
import PostRoot from "./pages/PostsRoot";
import Error from "./pages/Error";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "users",
        element: <UserRoot />,
        children: [
          { index: true, element: <Users /> },
          { path: ":userId", element: <UserDetails /> },
        ],
      },
      {
        path: "posts",
        element: <PostRoot />,
        children: [
          { index: true, element: <Posts /> },
          { path: ":postId", element: <PostDetails /> },
        ],
      },
      { path: "todos", element: <Todos /> },
    ],
  },
]);

function App() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return <RouterProvider router={router} />;
}

export default App;
