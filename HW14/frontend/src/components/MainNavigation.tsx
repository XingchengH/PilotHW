import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <header>
        <ul className="nav nav-tabs pt-3 justify-content-center fixed-top">
            <li className="nav-item">
                <NavLink to="/" className="nav-link">Dashboard</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/todo" className="nav-link">Todo</NavLink>
            </li>
        </ul>
    </header>
  );
}

export default MainNavigation;
