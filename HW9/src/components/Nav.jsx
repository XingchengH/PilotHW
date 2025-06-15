import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Demo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#userNavMenu"
          aria-controls="userNavMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="userNavMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/table">
                Question 1 Table
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/users">
                Question 2 Users 1
              </Link>
            </li>
            <div className="nav-item">
              <Link className="nav-link" to="/form">
                Question 2 Add User 1
              </Link>
            </div>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/usersway2">
                Question 2 Users 2
              </Link>
            </li>
            <div className="nav-item">
              <Link className="nav-link" to="/form2">
                Question 2 Add User 2
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to="/question3">
                Question 3
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to="/question4">
                Question 4
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to="/question5">
                Question 5
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
