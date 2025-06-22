import type React from "react";
import UserNavigation from "../components/UserNavigation";
import { Outlet } from "react-router-dom";

const UserRoot: React.FC = () => {
    return <>
        <UserNavigation />
        <main>
            <Outlet />
        </main>
    </>
}

export default UserRoot;