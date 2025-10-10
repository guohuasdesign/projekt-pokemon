import express from "express";
import Score from "../models/Score.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";

const router = express.Router();

// FR012 - GET /leaderboard - returns top scores sorted descending
// Query params: ?limit=10

router.get("/", authMiddleware, async (req, res) => {
  try {
    const limit = Math.min(100, Number(req.query.limit) || 10);
    const topScores = await Score.find().sort({ score: -1 }).limit(limit);
    console.log(topScores);
    res.json({ data: topScores });
  } catch (err) {
    console.error("GET /leaderboard error:", err);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
});

// FR013 - POST /leaderboard - create a new score for the authenticated user
router.post(
  "/",
  authMiddleware,
  async (req: express.Request, res: express.Response) => {
    try {
      const user = (req as any).user;
      if (!user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { score } = req.body;
      if (typeof score !== "number") {
        return res.status(400).json({ message: "Score must be a number" });
      }

      const newScore = new Score({ userId: user.id, score });
      await newScore.save();

      res.status(201).json({ data: newScore });
    } catch (err) {
      console.error("POST /leaderboard error:", err);
      res.status(500).json({ message: "Failed to submit score" });
    }
  }
);

export default router;
