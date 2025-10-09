import { Router } from "express";
import { getLeaderboard, createLeaderboard } from "../controllers/index.ts";

import { validateZod } from "../middleware/index.ts";
import { userInputSchema, paramsSchema } from "../schemas/index.ts";

const leaderboardRoutes = Router();
leaderboardRoutes
  .route("/")
  .get(getLeaderboard)
  .post(validateZod(userInputSchema, "body"), createLeaderboard);

export default leaderboardRoutes;
