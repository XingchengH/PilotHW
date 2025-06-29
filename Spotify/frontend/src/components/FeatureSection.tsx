import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../store/store";
import LoadingSpinner from "./Spinner";

export default function FeatureSection() {
  const dispatch = useDispatch<AppDispath>();
  const { status, featured, error } = useSelector(
    (state: RootState) => state.songs
  );

  if (status === "loading") return <LoadingSpinner />;

  if (error) return <p className="text-danger mb-4 display-4">{error}</p>;

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-4">
      {featured.map((song) => (
        <div key={song._id} className="col">
          <div
            className="d-flex align-items-center bg-dark bg-opacity-50 rounded p-2 "
            style={{ cursor: "pointer", transition: "box-shadow 0.3s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(255,255,255,0.5)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
          >
            <img
              src={song.imgUrl}
              alt={song.title}
              className="rounded me-3"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div className="flex-grow-1 p-2">
              <h6 className="mb-1 text-truncate" style={{ maxWidth: "100%" }}>
                {song.title}
              </h6>
              <small
                className="text-muted text-truncate"
                style={{ maxWidth: "100%" }}
              >
                {song.artist}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
