import type { Request, Response } from "express";
import { User } from "../models/index.ts";

export const getLeaderboard = async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export const createLeaderboard = async (req: Request, res: Response) => {
  const users = new User(req.body);
  await users.save();
  res.status(201).json(users);
};
