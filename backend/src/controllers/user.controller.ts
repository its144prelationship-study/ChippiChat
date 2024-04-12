import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export const userController = {
	login: async (req: Request, res: Response) => {
		const { username, password } = req.body;
		if (!username) {
			return res.status(400).json({
				success: false,
				message: 'Username is required',
			});
		}
		if (!password) {
			return res.status(400).json({
				success: false,
				message: 'Password is required',
			});
		}

		const user = await userService.login(username, password);
		if (user.success) {
			res.status(200).json(user);
		} else {
			res.status(user.code).json({
				success: false,
				message: user.message,
			});
		}
	},
};