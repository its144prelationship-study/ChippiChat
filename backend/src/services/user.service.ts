import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/user.repository';

export const userService = {
    login: async (username: string, password: string) => {
        try {
            const user = await userRepository.findUser(null, username);
            if (!user) {
                return {
                    success: false,
                    code: 404,
                    message: 'User not found',
                };
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return {
                    success: false,
                    code: 401,
                    message: 'Incorrect password',
                };
            }

            return {
                success: true,
                message: 'User logged in',
                data: user,
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: 'Internal server error',
            };
        }
    },
};