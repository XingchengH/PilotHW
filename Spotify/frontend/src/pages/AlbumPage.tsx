import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../store/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchAlbumById } from "../store/slices/albumsSlice";
import LoadingSpinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlay } from "@fortawesome/free-solid-svg-icons";

export default function AlbumPage() {
  const { albumId } = useParams();
  const dispatch = useDispatch<AppDispath>();
  const { selectedAlbum, selectedAlbumStatus, error } = useSelector(
    (state: RootState) => state.albums
  );

  useEffect(() => {
    if (albumId) {
      dispatch(fetchAlbumById(albumId));
    }
  }, [dispatch, albumId]);

  if (selectedAlbumStatus === "loading") {
    return <LoadingSpinner size="sm" />;
  }

  function formatDuration(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }

  return (
    <div className="h-100 overflow-hidden">
      <div
        className="text-white px-2 text-break"
        style={{ position: "relative", minHeight: "100%" }}
      >
        {/* Main */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(to bottom, rgba(80,56,160,0.8), rgba(36,36,36,0.8), rgba(36,36,36,0.8))",
          }}
          aria-hidden="true"
        >
          {/* Content */}
          <div className="postion-relative zIndex-10 overflow-auto">
            <div className="d-flex p-4 gap-4 pb-4">
              <img
                src={selectedAlbum?.imgUrl}
                alt={selectedAlbum?.title}
                className="rounded shadow-lg"
                style={{ width: "240px", height: "240px", objectFit: "cover" }}
              />
              <div className="d-flex flex-column justify-content-end">
                <p className="small fw-medium">Album</p>
                <h1 className="display-1 fw-bold my-4">
                  {selectedAlbum?.title}
                </h1>
                <div className="d-flex align-items-center small text-white gap-2">
                  <span className="fw-bold text-white">
                    {selectedAlbum?.artist} •
                  </span>
                  <span>{selectedAlbum?.songs?.length} songs •</span>
                  <span className="fw-medium text-white">
                    {selectedAlbum?.artist}
                  </span>
                  <span>{selectedAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* Play button */}
            <div className="px-4 pb-3 d-flex align-items-center gap-3">
              <button
                type="button"
                className="btn btn-success rounded-circle d-flex justify-content-center align-items-center p-0"
                style={{
                  width: "56px",
                  height: "56px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#28a745cc";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#28a745";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <FontAwesomeIcon
                  icon={faPlay}
                  className="text-black"
                  style={{ width: "14px", height: "28px", lineHeight: 1 }}
                />
              </button>
            </div>

            {/* Table */}
            <div
              className="backdrop-blur-sm rounded p-3 overflow-auto"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                height: "calc(908px - 600px)",
              }}
            >
              <div style={{ minHeight: "100%" }}>
                <table className="table table-hover table-borderless text-white align-middle mb-0">
                  <thead>
                    <tr>
                      <th scope="col" className="text-muted fw-normal">
                        #
                      </th>
                      <th scope="col" className="text-muted fw-normal">
                        Title
                      </th>
                      <th scope="col" className="text-muted fw-normal">
                        Released Date
                      </th>
                      <th scope="col" className="text-end text-muted fw-normal">
                        <FontAwesomeIcon icon={faClock} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAlbum?.songs?.map((song, index) => (
                      <tr key={song._id} style={{ cursor: "pointer" }}>
                        <td className="text-muted">{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={song.imgUrl}
                              alt={song.title}
                              className="rounded"
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <div className="fw-semibold text-white text-truncate">
                                {song.title}
                              </div>
                              <div className="text-muted small text-truncate">
                                {song.artist}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className=" text-muted">
                          {song.createdAt.split("T")[0]}
                        </td>
                        <td className="text-end text-muted">
                          {formatDuration(song.duration)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
