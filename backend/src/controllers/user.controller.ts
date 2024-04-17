import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { JwtUtil } from "../utils/jwt.util";

export const userController = {
  createUser: async (req: Request, res: Response) => {
    if (!req.body.username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await userService.createUser(req.body);
    if (user.success) {
      res.status(201).json(user);
    } else {
      res.status(user.code).json({
        success: false,
        message: user.message,
      });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      if (!req.body.username) {
        return res.status(400).json({
          success: false,
          message: "Username is required",
        });
      }
      if (!req.body.password) {
        return res.status(400).json({
          success: false,
          message: "Password is required",
        });
      }

      const response = await userService.login(req.body);
      if (response.success) {
        res.status(200).json(response);
      } else {
        res.status(response.code).json({
          success: false,
          message: response.message,
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });

      res.status(200).json({
        success: true,
        message: "User logged out",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  getCurrentUser: async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await JwtUtil.verifyToken(token);
      console.log(decoded);
      const user = await userService.getUserById(decoded.user_id);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};
