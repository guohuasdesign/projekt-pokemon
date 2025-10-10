import express from "express";
import "./db/index.ts";
import leaderboardRoutes from "./routers/leaderboardRoutes.ts";
import cors from "cors";
//import { errorHandler, notFound } from "./middleware/index.ts";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/leaderboard", leaderboardRoutes);

//app.use(notFound);
//app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
