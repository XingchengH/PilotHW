import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import PlaylistSkeleton from "./skeletons/PlaylistSkeleton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../store/store";
import { fetchSongs } from "../store/slices/songsSlice";
import { fetchAlbums } from "../store/slices/albumsSlice";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  const dispatch = useDispatch<AppDispath>();
  const { songs, status, error } = useSelector(
    (state: RootState) => state.songs
  );

  const {
    albums,
    status: albumsStatus,
    error: albumsError,
  } = useSelector((state: RootState) => state.albums);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSongs());
    }
    if (albumsStatus === "idle") {
      dispatch(fetchAlbums());
    }
  }, [status, albumsStatus, dispatch]);

  return (
    <div className="h-100 d-flex flex-column gap-2">
      <div className="flex-grow-1 rounded bg-dark p-3 d-flex flex-column">
        <div className="d-flex align-items-center text-white mb-3 px-2">
          <FontAwesomeIcon icon={faMusic} className="me-2" />
          <span className="d-none d-md-inline">Playlists</span>
        </div>

        <div
          className="overflow-auto text-white px-2"
          style={{ height: "calc(100vh - 300px)" }}
        >
          {status === "loading" ? (
            <PlaylistSkeleton />
          ) : (
            Object.values(albums.albums ?? {}).map((album, index) => (
              <Link
                to={`/albums/${album._id}`}
                key={album._id || index}
                className="p-2 rounded d-flex align-items-center gap-3 text-decoration-none bg-dark text-white hover-bg"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={album.imgUrl}
                  alt="Playlist img"
                  className="rounded flex-shrink-0"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <div className="d-none d-md-block text-truncate w-100">
                  <p className="mb-0 fw-medium text-truncate">{album.title}</p>
                  <small className="text-muted text-truncate d-block">
                    Album - {album.artist}
                  </small>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
