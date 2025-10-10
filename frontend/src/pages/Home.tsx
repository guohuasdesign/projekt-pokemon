import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listPokemon, idFromUrl, imageFor, type PokeListItem } from "../lib/pokemonAPI";

export default function Home() {
  const [items, setItems] = useState<PokeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await listPokemon(0, 24);
        setItems(data.results);
      } catch (e: any) {
        setErr(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600" role="alert">{err}</div>;

  return (
    <div className="mx-auto max-w-7xl p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {items.map(it => {
          const id = idFromUrl(it.url)!;
          return (
            <Link
              to={`/pokemon/${id}`}
              key={it.name}
              className="group rounded-2xl bg-white shadow hover:shadow-lg transition p-3 focus:outline-none focus:ring-4 focus:ring-yellow-300"
            >
              <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
                <img src={imageFor(id)} alt={it.name} className="w-3/4 group-hover:scale-105 transition" loading="lazy" />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <h3 className="font-semibold capitalize">{it.name}</h3>
                <span className="text-xs text-slate-500">#{String(id).padStart(3, "0")}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
