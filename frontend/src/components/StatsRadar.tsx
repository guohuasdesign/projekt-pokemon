import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

type Stat = { label: string; value: number };

const StatsRadar = ({ stats }: { stats: Stat[] }) => {
  const order = [
    "hit points",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
  ];
  const sorted = [...stats].sort(
    (a, b) => order.indexOf(a.label) - order.indexOf(b.label),
  );

  const data = {
    labels: sorted.map((s) =>
      s.label.replace("-", " ").replace(/\b\w/g, (m) => m.toUpperCase()),
    ),
    datasets: [
      {
        label: "Base Stat",
        data: sorted.map((s) => s.value),
        backgroundColor: "rgba(16, 185, 129, 0.25)", // （emerald）
        borderColor: "rgba(16, 185, 129, 1)",
        pointBackgroundColor: "rgba(16, 185, 129, 1)",
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.25, // The lines are more rounded.
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100, // general nummer less than 200
        ticks: {
          stepSize: 10,
          showLabelBackdrop: false,
          color: "#64748b",
          font: { size: 12 },
        },
        grid: { color: "#bbdefb" },
        angleLines: { color: "#e2e8f0" },
        pointLabels: {
          color: "#334155",
          font: { size: 18, weight: "bold" as const },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="">
      <Radar data={data} options={options} />
    </div>
  );
};

export default StatsRadar;
