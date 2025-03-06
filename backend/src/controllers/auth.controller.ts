import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/index.utils.js";
import cloudinary from "../lib/cloudinary.js";
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

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Please create an account first!",
      });
      return;
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      res.status(400).json({
        message: "Invalid Credentials!",
      });
      return;
    }
    // Set user as online
    user.isOnline = true;
    await user.save();
    
    generateToken(user._id.toString(), res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      isOnline: user.isOnline,
    });
    return;
  } catch (error) {
    console.error(error);
    console.log("Error in signup controller");
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};
export const logout = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user._id;
    
    // Set user as offline
    await User.findByIdAndUpdate(userId, { isOnline: false });
    
    // Clear the JWT cookie
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
    });
    
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { profilePic } = req.body;
    //@ts-ignore
    const userID = req.user._id;
    if (!profilePic) {
      res.status(400).json({
        message: "Profile pic is required",
      });
      return;
    }
    const pictureResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { profilePic: pictureResponse.secure_url },
      { new: true },
    );
    if (!updatedUser) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating profile",
    });
    return;
  }
};

export const checkAuth = (req: Request, res: Response) => {
  try {
    //@ts-ignore
    res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
