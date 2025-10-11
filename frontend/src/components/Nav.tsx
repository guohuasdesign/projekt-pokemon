import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadRoster } from "../lib/roster";

const Nav = () => {
    const { pathname } = useLocation();
    const [count, setCount] = useState<number>(() => loadRoster().length);

    // 监听本页变化（比如在详情页点 "Add to Roster"）
    useEffect(() => {
        const sync = () => setCount(loadRoster().length);
        window.addEventListener("storage", sync);
        // 兼容同页操作：每次路由变化也同步一次
        sync();
        return () => window.removeEventListener("storage", sync);
    }, [pathname]);

    const linkCls = (p: string) =>
        `px-3 py-2 rounded-lg font-medium ${pathname === p ? "bg-slate-200" : "hover:bg-slate-100"}`;

    return (
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
            <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
                <Link to="/" className="font-bold">Pokémon</Link>
                <nav className="flex items-center gap-2">
                    <Link to="/" className={linkCls("/")}>Home</Link>
                    <Link to="/my-roster" className={linkCls("/my-roster")}>
                        My Roster
                        <span className="ml-2 inline-flex items-center justify-center text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                            {count}
                        </span>
                    </Link>
                    <Link to="/login" className={linkCls("/login")}>Login</Link>
                    <Link to="/register" className={linkCls("/register")}>Register</Link>
                </nav>
            </div>
        </header>
    );
};

export default Nav;