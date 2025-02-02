import { Request, Response } from "express";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

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
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatWithID } = req.params;
    // @ts-ignore
    const myID = req.user._id;
    const message = await Message.find({
      $or: [
        { senderId: myID, receiverId: userToChatWithID },
        { senderId: userToChatWithID, receiverId: myID },
      ],
    });
    res.status(200).json(message);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { text, image } = req.body;
    const { id: receiverID } = req.params;
    //@ts-ignore
    const senderID = req.user._id;
    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderID,
      receiverID,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    //todo => real time functionality(using socket io)

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    console.log("Internal server error!");
  }
};
