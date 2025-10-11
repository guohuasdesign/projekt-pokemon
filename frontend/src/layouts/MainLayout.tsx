import { Outlet } from "react-router-dom";
import { Nav } from "../components";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Nav part */}
            <Nav />
            
            {/* content part */}
            <main className="mx-auto max-w-6xl px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
}
