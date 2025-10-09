import type { Request, Response } from "express";
import { User } from "../models/index.ts";


export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
    const users = new User(req.body);
    await users.save();
    res.status(201).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({message: "User not found"});
    res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  };

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};