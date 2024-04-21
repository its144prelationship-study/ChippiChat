import { CreateUser, LoginRequest, UpdateUser } from "../types/user.types";
import { userRepository } from "../repositories/user.repository";
import { get } from "http";
import { JwtUtil } from "../utils/jwt.util";
import { TokenInfo } from "../types/token.types";

const bcrypt = require("bcrypt");

export const userService = {
  createUser: async (body: CreateUser) => {
    try {
      const existingUser = await userRepository.findUser(null, body.username);
      if (existingUser) {
        return {
          success: false,
          code: 400,
          message: "Username already exists",
        };
      }

      const user = await userRepository.createUser(body);
      if (user) {
        return {
          success: true,
          message: "User created",
        };
      } else {
        return {
          success: false,
          code: 500,
          message: "Cannot create user",
        };
      }
    } catch (err) {
      console.error(err.message);
      return {
        success: false,
        code: 500,
        message: "Internal server error",
      };
    }
  },
  updateUsr: async (user_id: string, body: UpdateUser) => {
    try {
      const user = await userRepository.updateUser(user_id, body);
      if (!user) {
        return { success: false, code: 400, message: "Cannot update user" };
      }
      return { success: true, message: "User Updated" };
    } catch (err) {
      console.error(err.message);
      return { success: false, code: 500, message: "Internal server error" };
    }
  },
  validateUsername: async (username: string) => {
    try {
      const user = await userRepository.findUser(null, username);
      if (!user) {
        return { success: true, code: 404, message: "User not found" };
      }
      return {
        success: true,
        message: `Found a user with the username ${username}`,
        data: {
          username: user.username,
        },
      };
    } catch (err) {
      console.error(err.message);
      return { success: false, code: 500, message: "Internal server error" };
    }
  },
  login: async (body: LoginRequest) => {
    try {
      const user = await userRepository.findUser(null, body.username);
      if (!user) {
        return {
          success: false,
          code: 404,
          message: "User not found",
        };
      }

      const isMatch = await user.matchPassword(body.password);
      if (!isMatch) {
        return {
          success: false,
          code: 401,
          message: "Incorrect password",
        };
      }

      const payload: TokenInfo = {
        user_id: user._id
      };
      const token = await JwtUtil.signToken(payload);
      return {
        success: true,
        message: "User logged in",
        data: {
          token: token,
        },
      };
    } catch (err) {
      console.error(err.message);
      return {
        success: false,
        code: 500,
        message: "Internal server error",
      };
    }
  },
  getUserById: async (id: string) => {
    try {
      const user = await userRepository.findUser(id, null);
      if (user) {
        return {
          success: true,
          message: "User found",
          data: user
        }
      } else {
        return {
          success: false,
          code: 404,
          message: "User not found"
        };
      }
    } catch (err) {
      console.error(err.message);
      return {
        success: false,
        code: 500,
        message: "Internal server error"
      };
    }
  },
};
