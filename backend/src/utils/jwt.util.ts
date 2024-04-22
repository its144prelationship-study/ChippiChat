import { TokenInfo } from "../types/token.types";

const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const configPath = path.resolve(__dirname, "..", "configs", "config.env");
dotenv.config({ path: configPath });

export const JwtUtil = {
    signToken: async (payload: TokenInfo) => {
        try {
            return await jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE,
            });
        } catch (err) {
            console.log(err.message);
            return null;
        }
    },
    verifyToken: async (token: string) => {
        try {
            return await jsonwebtoken.verify(token, process.env.JWT_SECRET) as TokenInfo;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    },
};