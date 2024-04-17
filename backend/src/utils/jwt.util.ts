const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const configPath = path.resolve(__dirname, "..", "configs", "config.env");
dotenv.config({ path: configPath });

export const JwtUtil = {
    verifyToken: async (token: string) => {
        try{
            return await jsonwebtoken.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.log(err.message);
            return null;
        }
    },
};