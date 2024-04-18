import { CreateUser, UpdateUser } from "../types/user.types";

const User = require("../models/UserModel");

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
  updateUser: async (user_id: string, body: UpdateUser) => {
    try {
      let user = await User.findById(user_id);
      if (!user) {
        return null;
      }
      user = await User.findByIdAndUpdate(user_id, body, {
        new: true,
        runValidators: true,
      });
      return user;
    } catch (error) {
      console.log(error);
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
