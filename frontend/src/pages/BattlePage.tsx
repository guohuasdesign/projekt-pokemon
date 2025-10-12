import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPokemon, type Pokemon } from "../lib/pokemonAPI";
import  StatsRadar from "../components/StatsRadar"; // add Base Stats Radar Chart

type BattleState = "idle" | "fighting" | "finished";

export default function BattlePage() {
  const [player, setPlayer] = useState<Pokemon | null>(null);
  const [opponent, setOpponent] = useState<Pokemon | null>(null);
  const [playerHP, setPlayerHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [battleState, setBattleState] = useState<BattleState>("idle");
  const [result, setResult] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);

  // 🧩 Load player Pokémon from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("selectedPokemon");
    if (stored) setPlayer(JSON.parse(stored));
  }, []);

  // 🎲 Random opponent
  useEffect(() => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    (async () => {
      const opp = await getPokemon(randomId);
      setOpponent(opp);
    })();
  }, []);

  // ⚔️ Battle logic
  const handleAttack = () => {
    if (!player || !opponent) return;
    if (battleState === "fighting") return;

    setBattleState("fighting");

    const playerPower = player.stats.reduce((s, x) => s + x.value, 0);
    const opponentPower = opponent.stats.reduce((s, x) => s + x.value, 0);

    const playerAttack = playerPower * (0.8 + Math.random() * 0.4);
    const opponentAttack = opponentPower * (0.8 + Math.random() * 0.4);

    const damageToOpponent = Math.floor((playerAttack / opponentPower) * 25);
    const damageToPlayer = Math.floor((opponentAttack / playerPower) * 25);

    setOpponentHP((hp) => Math.max(0, hp - damageToOpponent));
    setPlayerHP((hp) => Math.max(0, hp - damageToPlayer));

    const logEntry = `⚔️ ${player.name} dealt ${damageToOpponent} damage! 💥 ${opponent.name} dealt ${damageToPlayer}!`;
    setLog((prev) => [logEntry, ...prev]);

    setTimeout(() => {
      if (
        playerHP - damageToPlayer <= 0 &&
        opponentHP - damageToOpponent <= 0
      ) {
        setResult("It's a draw! 😐");
      } else if (playerHP - damageToPlayer <= 0) {
        setResult(`You lose! ${opponent.name} wins 💀`);
      } else if (opponentHP - damageToOpponent <= 0) {
        setResult(`You win! ${player.name} triumphs 🎉`);
      }
      setBattleState("idle");
    }, 800);
  };

  if (!player || !opponent)
    return <div className="p-6 text-center">Loading Pokémon…</div>;

  return (
    <div className="mx-auto max-w-5xl p-4 text-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">⚔️ Pokémon Battle</h1>
  
      <div className="flex flex-wrap justify-between items-center gap-6 md:gap-10">
        {/* Left (Player side) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center flex-1 min-w-[280px]"
        >
          <h2 className="text-lg md:text-xl font-semibold text-emerald-600 mb-2 capitalize">
            {player.name}
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Stats Radar */}
            <div className="w-40 h-40 md:w-48 md:h-48 bg-white/40 rounded-xl p-2 shadow-sm backdrop-blur-sm">
              <StatsRadar stats={player.stats} />
            </div>
            {/* Pokémon image */}
            <img
              src={player.image}
              alt={player.name}
              className="w-28 md:w-36 object-contain"
            />
          </div>
          <HPBar value={playerHP} color="emerald" />
        </motion.div>
  
        {/* VS */}
        <span className="text-xl md:text-2xl font-bold text-slate-700">VS</span>
  
        {/* Right (Opponent side) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center flex-1 min-w-[280px]"
        >
          <h2 className="text-lg md:text-xl font-semibold text-rose-600 mb-2 capitalize">
            {opponent.name}
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Pokémon image */}
            <img
              src={opponent.image}
              alt={opponent.name}
              className="w-28 md:w-36 object-contain"
            />
            {/* Stats Radar */}
            <div className="w-50 h-50 md:w-48 md:h-48 bg-white/40 rounded-xl p-2 shadow-sm backdrop-blur-sm order-2 md:order-none">
              <StatsRadar stats={opponent.stats} />
            </div>
          </div>
          <HPBar value={opponentHP} color="rose" />
        </motion.div>
      </div>
  
      {/* Attack button */}
      {!result && (
        <motion.button
          onClick={handleAttack}
          disabled={battleState === "fighting"}
          className="mt-8 bg-amber-400 text-white px-6 py-3 rounded-lg font-semibold text-base md:text-lg hover:bg-amber-500 transition disabled:opacity-50"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          Begin to battle!
        </motion.button>
      )}
  
      {/* Result section */}
      {result && (
        <motion.div
          className="mt-6 text-xl md:text-2xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {result}
          <button
            className="ml-4 text-sm bg-slate-200 px-3 py-1 rounded hover:bg-slate-300"
            onClick={() => window.location.reload()}
          >
            New Battle
          </button>
        </motion.div>
      )}
  
      {/* Battle Log */}
      <div className="mt-8 text-left bg-slate-50 border rounded-lg p-4 max-h-48 overflow-y-auto">
        <h3 className="font-semibold mb-2 text-sm md:text-base">Battle Log</h3>
        {log.length === 0 ? (
          <p className="text-slate-500 text-sm">No actions yet...</p>
        ) : (
          log.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-xs md:text-sm border-b border-slate-200 py-1"
            >
              {line}
            </motion.p>
          ))
        )}
      </div>
    </div>
  );

}

// 💚 Animated HP bar component (fixed color issue)
function HPBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  // Explicit Tailwind color map (so classes aren’t purged)
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-500",
    rose: "bg-rose-500",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
  };

  return (
    <div className="mt-2 w-32 mx-auto bg-slate-200 rounded-full overflow-hidden h-4">
      <motion.div
        className={`h-full ${colorMap[color] || "bg-slate-500"}`}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
