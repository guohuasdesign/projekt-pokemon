import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.ts";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Auth DB connected"))
  .catch(console.error);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Auth service running on port ${process.env.PORT}`);
});
