import { Outlet } from "react-router-dom";
import UserNavigation from "../components/UserNavigation";

export default function Users() {
  return (
    <>
      <h1>Users</h1>
      <UserNavigation />
      {/* <Outlet /> */}
    </>
  );
}
