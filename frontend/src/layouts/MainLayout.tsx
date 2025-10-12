import { Outlet, useLocation } from "react-router-dom";
import bg1 from "../assets/backgrounds/bg1.jpg";
import bg2 from "../assets/backgrounds/bg2.jpg";
import bg3 from "../assets/backgrounds/bg3.jpg";
import bg4 from "../assets/backgrounds/bg4.jpg";
import bg5 from "../assets/backgrounds/bg5.jpg";
import bg6 from "../assets/backgrounds/bg6.jpg";
import { Nav } from "../components";

const BG_POOL = [bg1, bg2, bg3, bg4, bg5, bg6];

export default function MainLayout() {
  const { pathname } = useLocation();
  const idx = Math.abs(hash(pathname)) % (BG_POOL.length || 1);
  const bg = BG_POOL[idx] ?? bg1;

  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden
        animate-[soft-zoom-in_420ms_ease-out]
          motion-reduce:animate-none"
      >
        <img
          src={bg}
          alt=""
          draggable={false}
          className="
            w-full h-full object-cover select-none
            blur-sm md:blur-[3px] scale-110
            will-change-[transform,filter]
          "
        />

        <div
          className="
          absolute inset-0 pointer-events-none
          mix-blend-multiply bg-amber-50 dark:bg-slate-800 opacity-60"
        />
      </div>

      {/* fixed Navigation on top place */}
      <header
        className=" fixed inset-x-0 top-0 z-30 
        bg-white/80 dark:bg-slate-900/60
        backdrop-blur border-b border-white/40 dark:border-white/10"
      >
        <div className="mx-auto max-w-6xl px-4">
          <Nav />
        </div>
      </header>

      <div className="h-16" aria-hidden />

      {/* Content */}
      <main role="main" className="relative z-10 mx-auto max-w-6xl px-4 py-6
      animate-[fade-in-up_420ms_ease-out] [animation-delay:120ms]
      motion-reduce:animate-none">
        <Outlet />
      </main>
    </div>
  );
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}
