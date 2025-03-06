import { Request, Response } from "express";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req: Request, res: Response): Promise<void> => {
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
  }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userToChatWithID } = req.params;
    // @ts-ignore
    const myID = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myID, receiverId: userToChatWithID },
        { senderId: userToChatWithID, receiverId: myID },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    //@ts-ignore
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error)
    console.log("Error in sendMessage controller")
    res.status(500).json({ error: "Internal server error" });
  }
};
