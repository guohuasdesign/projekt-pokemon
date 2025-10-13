import { useEffect, useState } from "react";

interface Score {
  _id: string;
  score: number;
  userId: string;
}

export default function LeaderboardPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScores = async () => {
      const token = localStorage.getItem("token"); // get JWT from login
      if (!token) {
        setError("You must be logged in to view the leaderboard");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/leaderboard?limit=10", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch leaderboard");

        const data = await res.json();
        setScores(data.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading leaderboard...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Leaderboard
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left uppercase tracking-wider">
                Rank
              </th>
              <th className="py-3 px-6 text-left uppercase tracking-wider">
                User
              </th>
              <th className="py-3 px-6 text-left uppercase tracking-wider">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {scores.map((score, index) => (
              <tr
                key={score._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  index === 0
                    ? "bg-yellow-100 font-bold"
                    : index === 1
                      ? "bg-gray-200 font-semibold"
                      : index === 2
                        ? "bg-orange-100 font-semibold"
                        : ""
                }`}
              >
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{score.userId}</td>
                <td className="py-4 px-6">{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
