const User = require('../models/user.model');

export const userRepository = {
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