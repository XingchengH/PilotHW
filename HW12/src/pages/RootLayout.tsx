import { Outlet } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"


export default function Layout() {
    return <>
    <MainNavigation />
    <main className="container-xl mt-5 pt-3">
        <Outlet />
    </main>
    </>
}