import { NavLink } from "react-router-dom";

export default function MainNavigation() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/todos"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Todos
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
