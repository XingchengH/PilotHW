import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import ErrorPage from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import UserLayout from "./layout/UserLayout";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AlbumPage from "./pages/AlbumPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "./store/store";
import { useEffect } from "react";
import { fetchFeaturedSongs, fetchMadeForYouSongs, fetchSongs, fetchTrendingSongs } from "./store/slices/songsSlice";
import { fetchAlbums } from "./store/slices/albumsSlice";
import LikeSong from "./pages/LikeSong";

function App() {
  const dispatch = useDispatch<AppDispath>();
  const { token, user, loading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!loading && token && user?.id) {
      dispatch(fetchSongs());
      dispatch(fetchAlbums());
      // dispatch(fetchUserLikedSongs());
      dispatch(fetchFeaturedSongs());
      dispatch(fetchMadeForYouSongs());
      dispatch(fetchTrendingSongs())
    }
  }, [loading, token, user?.id, dispatch]);

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
                { path: "likedSong", element: <LikeSong /> },
              ],
            },
            {
              path: "albums/:albumId",
              element: <AlbumPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
