import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export const userController = {
	createUser: async (req: Request, res: Response) => {
		if (!req.body.username) {
			return res.status(400).json({
				success: false,
				message: 'Username is required',
			});
		}
		if (!req.body.password) {
			return res.status(400).json({
				success: false,
				message: 'Password is required',
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
					message: 'Username is required',
				});
			}
			if (!req.body.password) {
				return res.status(400).json({
					success: false,
					message: 'Password is required',
				});
			}

			const user = await userService.login(req.body);
			if (user.success) {
				res.status(200).json(user);
			} else {
				res.status(user.code).json({
					success: false,
					message: user.message,
				});
			}
		} catch(err) {
			console.error(err.message);
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	},
};