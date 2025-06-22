import type React from "react";
import { Outlet } from "react-router-dom";
import PostNavigation from "../components/PostNavigation";

const PostRoot: React.FC = () => {
    return <>
        <PostNavigation />
        <main>
            <Outlet />
        </main>
    </>
}

export default PostRoot;