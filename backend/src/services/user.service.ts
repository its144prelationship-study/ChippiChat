import { CreateUser, LoginRequest } from "../types/user.types";
import { userRepository } from "../repositories/user.repository";

const bcrypt = require('bcrypt');

export const userService = {
    createUser: async (body: CreateUser) => {
        try {
            const existingUser = await userRepository.findUser(null, body.username)
            if (existingUser) {
                return { 
                    success: false, 
                    code: 400,
                    message: 'Username already exists'
                }
            }

            const user = await userRepository.createUser(body);
            if (user) {
                return {
                    success: true,
                    message: 'User created',
                    data: user,
                };
            } else {
                return {
                    success: false,
                    code: 500,
                    message: 'Cannot create user',
                };
            }
        } catch (err) {
            console.error(err.message);
            return {
                success: false,
                code: 500,
                message: 'Internal server error',
            };
        }
    },
    login: async (body: LoginRequest) => {
        try {
            const user = await userRepository.findUser(null, body.username);
            if (!user) {
                return {
                    success: false,
                    code: 404,
                    message: 'User not found',
                };
            }

            const isMatch = await user.matchPassword(body.password);
            if (!isMatch) {
                return {
                    success: false,
                    code: 401,
                    message: 'Incorrect password',
                };
            }

            const token = user.getSignedJwtToken();
            return {
                success: true,
                message: 'User logged in',
                data: {
                    username: user.username,
                    token: token,
                },
            };
        } catch (err) {
            console.error(err.message);
            return {
                success: false,
                message: 'Internal server error',
            };
        }
    },
};