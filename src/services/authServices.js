import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export default {
    async register(userData) {
        const userExists = await User.exists({ email: userData.email });

        if (userExists) {
            throw new Error('User already exists!');
        }

        return await User.create(userData);
    },
    async login(email, password) {
        const user = await User.findOne({email});

        // Validate User
        if (!user) {
            throw new Error('Invalid user or password!');
        }

        // Validate Password
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invaid user or password!');
        }

        return user;
    }
}