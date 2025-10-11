type Props = { type: string };
const map: Record<string, string> = {
  fire:"bg-orange-500 text-white", water:"bg-blue-500 text-white", grass:"bg-green-600 text-white",
  electric:"bg-yellow-400 text-slate-900", ground:"bg-amber-700 text-white", rock:"bg-stone-600 text-white",
  ice:"bg-cyan-400 text-slate-900", fighting:"bg-red-700 text-white", psychic:"bg-pink-500 text-white",
  bug:"bg-lime-600 text-white", ghost:"bg-violet-700 text-white", dragon:"bg-indigo-700 text-white",
  dark:"bg-slate-800 text-white", steel:"bg-zinc-500 text-white", fairy:"bg-fuchsia-400 text-slate-900",
  normal:"bg-slate-400 text-slate-900", flying:"bg-sky-400 text-slate-900", poison:"bg-purple-600 text-white"
};
export default function TypeBadge({ type }: Props) {
  const cls = map[type] ?? "bg-slate-300 text-slate-900";
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${cls}`}>{type}</span>;
}
