import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String, 
        required: [true, 'E-mail is required!'], 
        unique: [true, 'E-mail should be unique!'], 
    },
    password: {
        type: String, 
        required: [true, 'Password is required!'], 
    }
});

export const User = model('User', userSchema, 'users');