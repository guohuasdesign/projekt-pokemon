// src/lib/roster.ts
const KEY = "my_roster";                 // stores an array of IDs, e.g. [25,1,7]
const EVENT = "roster:update";           // custom event name for UI sync

/** Broadcast a UI update when roster changes (no-op on SSR) */
function notify() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT));
  }
}

export function loadRoster(): number[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

/** Save (deduped) IDs and notify listeners */
export function saveRoster(ids: number[]) {
  const deduped = Array.from(new Set(ids));
  localStorage.setItem(KEY, JSON.stringify(deduped));
  notify();
}

export function addToRoster(id: number) {
  const cur = loadRoster();
  if (!cur.includes(id)) {
    cur.push(id);
    saveRoster(cur); // will notify()
  } else {
    notify();        // still notify so badges/pages refresh immediately
  }
  return cur;
}

export function removeFromRoster(id: number) {
  const next = loadRoster().filter((x) => x !== id);
  saveRoster(next); // will notify()
}

export function inRoster(id: number) {
  return loadRoster().includes(id);
}

/** (optional) clear helper */
export function clearRoster() {
  saveRoster([]);
}

