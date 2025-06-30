import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPlay,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import type { AppDispath, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserLikedSongs } from "../store/slices/userSlice";
import LoadingSpinner from "../components/Spinner";
import { axiosInstance } from "../lib/axios";
import SongPageLayout from "../components/SongPageLayout";

export default function LikedSongs() {
  const dispatch = useDispatch<AppDispath>();
  const { user, likedSongs, likedSongsStatus } = useSelector(
    (state: RootState) => state.user
  );
  const [likedSongIds, setLikedSongIds] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchUserLikedSongs());
  }, [dispatch]);

  useEffect(() => {
    if (likedSongs.length > 0) {
      setLikedSongIds(likedSongs.map((song) => song._id));
    }
  }, [likedSongs]);

  const toggleLike = async (songId: string) => {
    try {
      const isLiked = likedSongIds.includes(songId);
      if (isLiked) {
        await axiosInstance.delete("/users/unlike", {
          data: { songId },
        });
        setLikedSongIds((prev) => prev.filter((id) => id !== songId));
      } else {
        await axiosInstance.post("/users/liking", { songId });
        setLikedSongIds((prev) => [...new Set([...prev, songId])]);
      }
      dispatch(fetchUserLikedSongs());
    } catch (err) {
      console.error("Error toggling like", err);
    }
  };

  function formatDuration(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }

  // if (likedSongsStatus === "loading" || !user?.id) {
  //   return <LoadingSpinner size="sm" centered />;
  // }

  return (
    <SongPageLayout
      coverImgUrl="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
      typeLabel="Playlist"
      title="Liked Songs"
      subtitle={
        <span className="fw-bold text-white">{likedSongs.length} songs</span>
      }
      songs={likedSongs}
      likedSongIds={likedSongIds}
      onLikeToggle={toggleLike}
      formatDuration={formatDuration}
    />
  );
}
