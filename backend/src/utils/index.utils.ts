import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userID: string, res: Response) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
