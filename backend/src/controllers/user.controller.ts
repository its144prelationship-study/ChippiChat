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

    const response = await userService.createUser(req.body);
    if (response.success) {
      res.status(201).json(response);
    } else {
      res.status(response.code).json({
        success: false,
        message: response.message,
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
  updateUser: async (req: Request, res: Response) => {
    try {
      if (!req.params.userId) {
        return res
          .status(400)
          .json({ success: false, message: "UserID is required" });
      }

      if (!req.body.username) {
        return res.status(400).json({
          success: false,
          message: "Username is required",
        });
      }
      const response = await userService.updateUsr(req.params.userId, req.body);
      if (response.success) {
        res.status(201).json(response);
      } else {
        res.status(response.code).json({
          success: false,
          message: response.message,
        });
      }
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  validateUsername: async (req: Request, res: Response) => {
    try {
      if (!req.params.username) {
        return res
          .status(400)
          .json({ success: false, message: "Username is required" });
      }
      const user = await userService.validateUsername(req.params.username);
      if (user.success) {
        if (!user.data) {
          return res
            .status(200)
            .json({ success: true, message: "User not found" });
        } else {
          return res.status(200).json({
            success: true,
            message: `Found a user with the username ${user.data.username}`,
            data: { username: user.data.username },
          });
        }
      } else {
        return res
          .status(user.code)
          .json({ success: false, message: user.message });
      }
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
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
      const response = await userService.getUserById(decoded.user_id);
      res.status(200).json(response);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const response = await userService.getAllUsers();
      res.status(200).json(response);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
