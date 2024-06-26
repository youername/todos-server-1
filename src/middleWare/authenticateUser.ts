import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { redisClient, connectRedis } from "../redisClient";

interface JwtPayload {
  id: number;
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    await connectRedis(); // Redis 연결 확인

    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    const decoded = jwt.verify(token, "your_jwt_secret") as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};
