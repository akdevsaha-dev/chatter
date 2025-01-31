import { Request, Response } from "express";

export const signin = (req: Request, res: Response) => {
  res.send("Siginin");
};

export const signup = (req: Request, res: Response) => {
  res.send("Signout");
};

export const logout = (req: Request, res: Response) => {
  res.send("Logout");
};
