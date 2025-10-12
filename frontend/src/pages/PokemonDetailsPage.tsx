import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemon, type Pokemon, padId } from "../lib/pokemonAPI";
import { addToRoster, inRoster } from "../lib/roster";
import TypeBadge from "../components/TypeBadge";
import StatsRadar from "../components/StarsRadar";

export default function PokemonDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [isInRoster, setIsInRoster] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const p = await getPokemon(id);
        setData(p);
        setIsInRoster(inRoster(p.id));
      } catch (e: any) {
        setErr(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleAddToRoster = () => {
    if (data) {
      addToRoster(data.id);
      setIsInRoster(true);
      // 触发 storage 事件，让其他组件知道 roster 已更新
      window.dispatchEvent(new Event("storage"));
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;
  if (err || !data)
    return <div className="p-6 text-red-600">{err || "Not found"}</div>;

  return (
    <div className="mx-auto max-w-5xl p-4 columns-2xl">
      <div className="mb-4">
        <Link to="/" className="btn">
          ← Back
        </Link>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* image */}
        <div className="md:col-span-2 rounded-2xl bg-emerald-50 shadow p-4 flex items-center justify-center">
          <img
            src={data.image}
            alt={data.name}
            className="w-4/5 max-w-sm object-contain"
          />
        </div>

        {/* info */}
        <div className="md:col-span-3">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold capitalize">
              {data.name}{" "}
              <span className="text-slate-400">#{padId(data.id)}</span>
            </h1>
            {!isInRoster ? (
              <button
                onClick={handleAddToRoster}
                className="text-sm rounded-lg px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors font-medium"
              >
                Add to Roster
              </button>
            ) : (
              <span className="text-sm rounded-lg px-4 py-2 bg-slate-100 text-slate-600 font-medium">
                In Roster
              </span>
            )}
          </div>

          <div className="mt-2 flex gap-2">
            {data.types.map((t) => (
              <TypeBadge key={t} type={t} />
            ))}
          </div>

          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Abilities</h2>
            <ul className="list-disc list-inside capitalize text-slate-700">
              {data.abilities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Base Stats</h2>
            <div className=" bg-emerald-50 rounded-2xl shadow p-4">
              <StatsRadar stats={data.stats} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
