import express from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

export const authMiddleware: express.RequestHandler = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer "))
      return res.status(401).json({ message: "Authorization token missing" });

    const token = header.split(" ")[1];
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    (req as any).user = { id: decoded.userId };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
