import { Request, Response } from "express";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const loggedInUserID = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserID },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
  }
};
