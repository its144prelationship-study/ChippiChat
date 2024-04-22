import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.protect = async (req: Request, res: Response, next: NextFunction) => {
    var token: string | null = null;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized to access this route",
        });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user_id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found with this id",
            });
        }

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(401).json({
            success: false,
            message: "Not authorized to access this route",
        });
    }
};