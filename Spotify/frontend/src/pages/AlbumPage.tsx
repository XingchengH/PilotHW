import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../store/store";
import { useParams } from "react-router-dom";
import { fetchAlbumById } from "../store/slices/albumsSlice";
import LoadingSpinner from "../components/Spinner";
import { axiosInstance } from "../lib/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as solidHeart,
  faHeart as regularHeart,
} from "@fortawesome/free-regular-svg-icons";
import SongPageLayout from "../components/SongPageLayout";

export default function AlbumPage() {
  const { albumId } = useParams();
  const dispatch = useDispatch<AppDispath>();
  const { selectedAlbum, selectedAlbumStatus } = useSelector(
    (state: RootState) => state.albums
  );
  const userId = useSelector((state: RootState) => state.user.user?.id);

  const [likedSongIds, setLikedSongIds] = useState<string[]>([]);

  // Fetch album
  useEffect(() => {
    if (albumId) {
      dispatch(fetchAlbumById(albumId));
    }
  }, [dispatch, albumId]);

  // Fetch liked songs
  useEffect(() => {
    const fetchLiked = async () => {
      try {
        const res = await axiosInstance.get(`/users/likedSongs`);
        setLikedSongIds(res.data.likedSongs.map((song: any) => song._id));
      } catch (err) {
        console.error("Error fetching liked songs:", err);
      }
    };

    if (userId) fetchLiked();
  }, [userId]);

  // Like song
  const handleLike = async (songId: string) => {
    try {
      await axiosInstance.post(`/songs/liking/${userId}`, { songId });
      setLikedSongIds((prev) => [...new Set([...prev, songId])]);
    } catch (err) {
      console.error("Failed to like song", err);
    }
  };

  const formatDuration = (seconds: number): string => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  if (selectedAlbumStatus === "loading") {
    return <LoadingSpinner size="sm" />;
  }

  return (
    <SongPageLayout
      coverImgUrl={selectedAlbum?.imgUrl}
      typeLabel="Album"
      title={selectedAlbum?.title}
      subtitle={
        <>
          <span className="fw-bold text-white">{selectedAlbum?.artist} •</span>
          <span>{selectedAlbum?.songs?.length} songs •</span>
          <span className="fw-medium text-white">{selectedAlbum?.artist}</span>
          <span>{selectedAlbum?.releaseYear}</span>
        </>
      }
      songs={selectedAlbum?.songs || []}
      likedSongIds={likedSongIds}
      onLikeToggle={handleLike}
      formatDuration={formatDuration}
      showReleaseDate={true}
    />
  );
}
