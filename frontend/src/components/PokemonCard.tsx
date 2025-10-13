import { Link } from "react-router-dom";
import { useState } from "react";
import { addToRoster, inRoster } from "../lib/roster";

export default function PokemonCard({
  id,
  name,
  image,
  right,
}: {
  id: number;
  name: string;
  image: string;
  right?: React.ReactNode;
}) {
  const [isInRoster, setIsInRoster] = useState(() => inRoster(id));

  const handleAddToRoster = () => {
    addToRoster(id);
    setIsInRoster(true);
    // 触发 storage 事件，让其他组件知道 roster 已更新
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="rounded-2xl bg-white shadow p-3 flex items-center gap-3">
      <Link to={`/pokemon/${id}`} className="shrink-0">
        <div className="w-20 h-20 mask mask-hexagon rounded-xl bg-pink-100 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 object-contain"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="flex-1">
        <Link
          to={`/pokemon/${id}`}
          className="font-semibold capitalize hover:underline"
        >
          {name}
        </Link>
        <div className="text-xs text-slate-500">
          #{String(id).padStart(3, "0")}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!isInRoster ? (
          <button
            onClick={handleAddToRoster}
            className="text-sm rounded-lg px-3 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
          >
            Add to Roster
          </button>
        ) : (
          <span className="text-sm rounded-lg px-3 py-2 bg-slate-100 text-slate-600">
            In Roster
          </span>
        )}
        {right}
      </div>
    </div>
  );
}
