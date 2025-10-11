import { useEffect, useMemo, useState } from "react";
import { loadRoster, removeFromRoster, saveRoster } from "../lib/roster";
import { getPokemon, type Pokemon } from "../lib/pokemonAPI";
import PokemonCard from "../components/PokemonCard";

export default function MyRosterPage() {
  const [ids, setIds] = useState<number[]>(() => loadRoster());
  const [list, setList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 总能力值（小彩蛋）
  const total = useMemo(
    () => list.reduce((sum, p) => sum + p.stats.reduce((s, x) => s + x.value, 0), 0),
    [list]
  );

  useEffect(() => {
    if (ids.length === 0) { setList([]); return; }
    (async () => {
      try {
        setLoading(true); setErr(null);
        const results = await Promise.all(ids.map(id => getPokemon(id)));
        setList(results);
      } catch (e: any) {
        setErr(e.message || "Failed to load roster");
      } finally {
        setLoading(false);
      }
    })();
  }, [ids]);

  function remove(id: number) {
    removeFromRoster(id);
    setIds(loadRoster());
  }

  function clearAll() {
    saveRoster([]); // 清空
    setIds([]);
  }

  if (loading && list.length === 0) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;

  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">My Roster</h1>
          <p className="text-slate-600 text-sm">
            {ids.length} pokémon · Total base stats: <span className="font-semibold">{total}</span>
          </p>
        </div>
        {ids.length > 0 && (
          <button onClick={clearAll}
            className="text-sm rounded-lg px-3 py-2 bg-slate-200 hover:bg-slate-300">
            Clear All
          </button>
        )}
      </div>

      {ids.length === 0 ? (
        <div className="text-slate-600">Your roster is empty. Go to a Pokémon page and click “Add to Roster”.</div>
      ) : (
        <div className="grid gap-3">
          {list.map(p => (
            <PokemonCard
              key={p.id}
              id={p.id}
              name={p.name}
              image={p.image}
              right={
                <button
                  onClick={() => remove(p.id)}
                  className="text-sm rounded-lg px-3 py-2 bg-rose-100 text-rose-700 hover:bg-rose-200"
                >
                  Remove
                </button>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
