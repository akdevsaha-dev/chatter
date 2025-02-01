import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { NextFunction, Request, Response } from "express";

interface JwtPayload {
  userID: string;
}
export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({
        message: "Unauhtorized",
      });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    if (!decoded) {
      res.status(401).json({
        message: "unauthorized- Invalid token",
      });
    }
    const user = await User.findById(decoded.userID).select("-password");

    //@ts-ignore
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.json({
      message: "middleware error",
    });
  }
};
