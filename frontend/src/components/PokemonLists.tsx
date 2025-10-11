
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listPokemon, idFromUrl, imageFor, type PokeListItem } from "../lib/pokemonAPI";
import { addToRoster, inRoster } from "../lib/roster";

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
      <h1 className="text-3xl font-bold mb-6">Pokémon</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(it => {
          const id = idFromUrl(it.url)!;
          const isInRoster = inRoster(id);
          
          const handleAddToRoster = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            addToRoster(id);
            window.dispatchEvent(new Event('storage'));
          };

          return (
            <Link
              key={it.name}
              to={`/pokemon/${id}`}
              className="group block"
            >
              <div className="rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
                {/* Image Section */}
                <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                  <img 
                    src={imageFor(id)} 
                    alt={it.name} 
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" 
                    loading="lazy" 
                  />
                  
                  {/* Add to Roster Button */}
                  <button
                    onClick={handleAddToRoster}
                    className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110 ${
                      isInRoster 
                        ? 'bg-slate-100 text-slate-600' 
                        : 'bg-white text-emerald-600 hover:bg-emerald-50'
                    }`}
                    title={isInRoster ? "In Roster" : "Add to Roster"}
                  >
                    {isInRoster ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Content Section */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg capitalize text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {it.name}
                    </h3>
                    <span className="text-sm text-gray-500 font-mono">
                      #{String(id).padStart(3, "0")}
                    </span>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="mt-3">
                    {isInRoster ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        In Roster
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
