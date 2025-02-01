import { Request, response, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/index.utils.js";
export const signup = async (req: Request, res: Response) => {
  const { fullName, password, email } = req.body;
  try {
    if (password.length < 6) {
      res.json({ message: "Password must be atleast 6 characters" });
      return;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const existingUser = await User.findOne({
      email,
    });
    if (!existingUser) {
      const user = new User({
        fullName,
        email,
        password: hashedPassword,
      });

      if (user) {
        generateToken(user._id.toString(), res);
        await user.save();

        res.status(201).json({
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          profilePic: user.profilePic,
        });
        return;
      } else {
        res.status(400).json({
          message: "Invalid user data!",
        });
        return;
      }
    } else {
      res.json({
        message: "User already exists!",
      });
      return;
    }
  } catch (error) {
    console.error(error);
    console.log("Error in signup controller");
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};

export const signin = (req: Request, res: Response) => {
  res.send("Signout");
};

export const logout = (req: Request, res: Response) => {
  res.send("Logout");
};
