// src/lib/roster.ts
const KEY = "my_roster"; // 存放的是 id 列表，如 [25,1,7]

export function loadRoster(): number[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}
export function saveRoster(ids: number[]) {
  localStorage.setItem(KEY, JSON.stringify(Array.from(new Set(ids))));
}
export function addToRoster(id: number) {
  const cur = loadRoster();
  if (!cur.includes(id)) { cur.push(id); saveRoster(cur); }
  return cur;
}
export function removeFromRoster(id: number) {
  saveRoster(loadRoster().filter(x => x !== id));
}
export function inRoster(id: number) {
  return loadRoster().includes(id);
}
