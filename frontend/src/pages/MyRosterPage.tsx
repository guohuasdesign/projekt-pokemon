import { useEffect, useMemo, useState } from "react";
import { loadRoster, removeFromRoster, saveRoster } from "../lib/roster";
import { getPokemon, type Pokemon } from "../lib/pokemonAPI";
import PokemonCard from "../components/PokemonCard";
import { useNavigate } from "react-router-dom";

export default function MyRosterPage() {
  const [ids, setIds] = useState<number[]>(() => loadRoster());
  const [list, setList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  // 🧮 Total base stats
  const total = useMemo(
    () =>
      list.reduce(
        (sum, p) => sum + p.stats.reduce((s, x) => s + x.value, 0),
        0
      ),
    [list]
  );

  // 🔁 Sync roster changes
  useEffect(() => {
    const refresh = () => setIds(loadRoster());
    window.addEventListener("roster:update", refresh);
    window.addEventListener("storage", refresh);

    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);

    refresh(); // initial load

    return () => {
      window.removeEventListener("roster:update", refresh);
      window.removeEventListener("storage", refresh);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  // 🧩 Fetch Pokémon details
  useEffect(() => {
    if (ids.length === 0) {
      setList([]);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const results = await Promise.all(ids.map((id) => getPokemon(id)));
        setList(results);
      } catch (e: any) {
        setErr(e.message || "Failed to load roster");
      } finally {
        setLoading(false);
      }
    })();
  }, [ids]);

  // ❌ Remove Pokémon
  function remove(id: number) {
    removeFromRoster(id);
    setIds(loadRoster());
  }

  // 🧹 Clear all Pokémon
  function clearAll() {
    saveRoster([]);
    setIds([]);
  }

  // ✅ Select Pokémon for battle
  function selectForBattle(pokemon: Pokemon) {
    localStorage.setItem("selectedPokemon", JSON.stringify(pokemon));
    navigate("/battle"); // Go to battle page
  }

  // 🖼️ UI rendering
  if (loading && list.length === 0) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;

  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">My Roster</h1>
          <p className="text-slate-600 text-sm">
            {ids.length} Pokémon · Total base stats:{" "}
            <span className="font-semibold">{total}</span>
          </p>
        </div>
        {ids.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm rounded-lg px-3 py-2 bg-slate-200 hover:bg-slate-300"
          >
            Clear All
          </button>
        )}
      </div>

      {ids.length === 0 ? (
        <div className="text-slate-600">
          Your roster is empty. Go to a Pokémon page and click “Add to Roster”.
        </div>
      ) : (
        <div className="grid gap-3">
          {list.map((p) => (
            <PokemonCard
              key={p.id}
              id={p.id}
              name={p.name}
              image={p.image}
              right={
                <div className="flex gap-2">
                  <button
                    onClick={() => selectForBattle(p)}
                    className="text-sm rounded-lg px-3 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  >
                    Select to battle
                  </button>
                  <button
                    onClick={() => remove(p.id)}
                    className="text-sm rounded-lg px-3 py-2 bg-rose-100 text-rose-700 hover:bg-rose-200"
                  >
                    Remove
                  </button>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
