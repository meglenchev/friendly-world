import { User } from "../models/User.js";

export default {
    async register(userData) {
        const userExists = await User.exists({ email: userData.email });

        if (userExists) {
            throw new Error('User already exists!');
        }

        const user = await User.create(userData);

        return user;
    }
}