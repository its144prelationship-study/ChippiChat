import { CreateUser } from "../types/user.types";

const User = require('../models/UserModel');

export const userRepository = {
    createUser: async (body: CreateUser) => {
        try {
            const user = await User.create(body);
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    findUser: async (id: string, username: string) => {
        try {
            if (id) {
                return await User.findById(id);
            } else if (username) {
                return await User.findOne({ username: username });
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};