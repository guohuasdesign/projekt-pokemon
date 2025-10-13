const BASE = "https://pokeapi.co/api/v2";

export type PokeListItem = { name: string; url: string };
export type PokeListResp = {
  results: PokeListItem[];
  next: string | null;
  previous: string | null;
};

export async function listPokemon(
  offset = 0,
  limit = 24,
): Promise<PokeListResp> {
  const res = await fetch(`${BASE}/pokemon?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");
  return res.json();
}

export function idFromUrl(url: string) {
  const m = url.match(/\/pokemon\/(\d+)\//);
  return m ? Number(m[1]) : null;
}

export function imageFor(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
}

export type Pokemon = {
  id: number;
  name: string;
  types: string[];
  abilities: string[];
  stats: { label: string; value: number }[];
  image: string;
};

export async function getPokemon(idOrName: string | number): Promise<Pokemon> {
  const res = await fetch(`${BASE}/pokemon/${idOrName}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon");
  const d = await res.json();

  const types = d.types.map((t: any) => t.type.name as string);
  const abilities = d.abilities.map((a: any) => a.ability.name as string);
  const stats = d.stats.map((s: any) => ({
    label: s.stat.name as string,
    value: Number(s.base_stat),
  }));

  const image =
    d.sprites?.other?.dream_world?.front_default ??
    d.sprites?.other?.["official-artwork"]?.front_default ??
    d.sprites?.front_default;

  return { id: d.id, name: d.name, types, abilities, stats, image };
}

export function padId(n: number) {
  return String(n).padStart(3, "0");
}
