import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadRoster } from "../lib/roster";
import { isAuthed, logout } from "../lib/auth";

export default function Nav() {
  const { pathname } = useLocation();
  const [count, setCount] = useState<number>(() => loadRoster().length);
  const [authed, setAuthed] = useState(isAuthed());

  useEffect(() => {
    const onChange = () => setAuthed (isAuthed()); 
    window.addEventListener("auth:Change", onChange);
    return ()=> window.removeEventListener("auth:change", onChange);
    
    // const sync = () => setCount(loadRoster().length);
    // // ✅ same-tab updates (we dispatch this in saveRoster)
    // window.addEventListener("roster:update", sync);

    // // ✅ cross-tab updates
    // window.addEventListener("storage", sync);

    // // initial sync on route change/mount
    // sync();

    // return () => {
    //    window.removeEventListener("roster:update", sync);
    //    window.removeEventListener("storage", sync);
    // };

  }, [pathname]); // rerun on route change so we re-sync

  const linkCls = (p: string) =>
    `px-3 py-2 rounded-lg font-medium aria-[current=page]:bg-slate-200 hover:bg-slate-100 ${
      pathname === p ? "bg-slate-200" : ""
    }`;

  const handelLogout = () => {
    logout();
    Navigator("/", { replace: true }); //back to navigate("/login")
  };

  return (
    <div
      role="navigation"
      aria-label="Main"
      className="h-16 flex items-center justify-between"
    >
      <Link to="/" className="font-bold">
        Pokémon
      </Link>

      <nav className="flex items-center gap-2">
        <Link
          to="/"
          className={linkCls("/")}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          Home
        </Link>

        

        <Link
          to="/battle"
          className={linkCls("/battle")}
          aria-current={pathname === "/battle" ? "page" : undefined}
        >
          Pokemon Battle
        </Link>

        <Link
          to="/my-roster"
          className={linkCls("/my-roster")}
          aria-current={pathname === "/my-roster" ? "page" : undefined}
        >
          My Roster
          <span className="ml-2 inline-flex items-center justify-center text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
            {count}
          </span>
        </Link>

        <Link
          to="/leaderboard"
          className={linkCls("/leaderboard")}
          aria-current={pathname === "/leaderboard" ? "page" : undefined}
        >
          Leaderboard
        </Link>

        <Link
          to="/login"
          className={linkCls("/login")}
          aria-current={pathname === "/login" ? "page" : undefined}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={linkCls("/register")}
          aria-current={pathname === "/register" ? "page" : undefined}
        >
          Register
        </Link>
      </nav>
    </div>
  );
}
