import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/RootLayout";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Todos from "./pages/Todos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "users",
        element: <Users />,
        children: [{ path: ":userId", element: <UserDetails /> }],
      },
      {
        path: "posts",
        element: <Posts />,
        children: [{ path: ":postId", element: <PostDetails /> }],
      },
      { path: "todos", element: <Todos /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
