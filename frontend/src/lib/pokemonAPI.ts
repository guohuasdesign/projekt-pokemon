const BASE = "https://pokeapi.co/api/v2";

export type PokeListItem = { name: string; url: string }; // url 里含 id
export type PokeListResp = { results: PokeListItem[]; next: string | null; previous: string | null };

export async function listPokemon(offset = 0, limit = 24): Promise<PokeListResp> {
  const res = await fetch(`${BASE}/pokemon?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");
  return res.json();
}

// 从 item.url 提取数字 id（如 .../pokemon/25/ -> 25）
export function idFromUrl(url: string) {
  const m = url.match(/\/pokemon\/(\d+)\//);
  return m ? Number(m[1]) : null;
}

export function imageFor(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
}
