var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/index.utils.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, password, email } = req.body;
    try {
        if (password.length < 6) {
            res.json({ message: "Password must be atleast 6 characters" });
            return;
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt.hash(password, saltRounds);
        const existingUser = yield User.findOne({
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
                yield user.save();
                res.status(201).json({
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    profilePic: user.profilePic,
                });
                return;
            }
            else {
                res.status(400).json({
                    message: "Invalid user data!",
                });
                return;
            }
        }
        else {
            res.json({
                message: "User already exists!",
            });
            return;
        }
    }
    catch (error) {
        console.error(error);
        console.log("Error in signup controller");
        res.status(500).json({
            message: "Internal server error",
        });
        return;
    }
});
export const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "Please create an account first!",
            });
            return;
        }
        const isCorrectPassword = yield bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            res.status(400).json({
                message: "Invalid Credentials!",
            });
            return;
        }
        // Set user as online
        user.isOnline = true;
        yield user.save();
        generateToken(user._id.toString(), res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            isOnline: user.isOnline,
        });
        return;
    }
    catch (error) {
        console.error(error);
        console.log("Error in signup controller");
        res.status(500).json({
            message: "Internal server error",
        });
        return;
    }
});
export const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = req.user._id;
        // Set user as offline
        yield User.findByIdAndUpdate(userId, { isOnline: false });
        // Clear the JWT cookie
        res.cookie("jwt", "", {
            maxAge: 0,
            httpOnly: true,
        });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.error("Error in logout controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
export const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const pictureResponse = yield cloudinary.uploader.upload(profilePic);
        const updatedUser = yield User.findByIdAndUpdate(userID, { profilePic: pictureResponse.secure_url }, { new: true });
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating profile",
        });
        return;
    }
});
export const checkAuth = (req, res) => {
    try {
        //@ts-ignore
        res.status(200).json(req.user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
