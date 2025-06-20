import { NavLink, useParams } from "react-router-dom";

export default function UserNavigation() {
  const { userId } = useParams();

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                All Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/users/${userId}`}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Activity
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
