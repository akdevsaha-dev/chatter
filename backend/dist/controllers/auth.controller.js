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
export const signin = (req, res) => {
    res.send("Signout");
};
export const logout = (req, res) => {
    res.send("Logout");
};
