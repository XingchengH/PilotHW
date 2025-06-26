import postGet from "../assets/img/postmanGet.png";
import postPost from "../assets/img/postmanPost.png";
import postDelete from "../assets/img/postmanDelete.png";
import postPut from "../assets/img/postmanUpdate.png";

export default function Dashboard() {
  return (
    <div
      id="postmanCarousel"
      className="carousel slide mx-auto rounded-3 shadow"
      style={{ maxWidth: "750px" }}
      data-bs-ride="carousel"
    >
      <div className="carousel-inner rounded-3">
        <div className="carousel-item active">
          <p className="text-center mt-2 fw-bold">Get Request</p>
          <img src={postGet} className="d-block w-100" alt="GET request" />
        </div>
        <div className="carousel-item">
          <p className="text-center mt-2 fw-bold">Delete Request</p>
          <img
            src={postDelete}
            className="d-block w-100"
            alt="DELETE request"
          />
        </div>
        <div className="carousel-item">
          <p className="text-center mt-2 fw-bold">Post Request</p>
          <img src={postPost} className="d-block w-100" alt="POST request" />
        </div>
        <div className="carousel-item">
          <p className="text-center mt-2 fw-bold">Put Request</p>
          <img src={postPut} className="d-block w-100" alt="PUT request" />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#postmanCarousel"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon bg-primary rounded-circle position-absolute"
          style={{ left: "-50px" }}
          aria-hidden="true"
        ></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#postmanCarousel"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon bg-primary rounded-circle position-absolute"
          style={{ right: "-50px" }}
          aria-hidden="true"
        ></span>
      </button>
    </div>
  );
}
