import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    email: {
        type: String, 
        required: [true, 'E-mail is required!'], 
        unique: [true, 'E-mail should be unique!'], 
        minLength: [10, 'E-mail shold be at least 10 characters long!'], 
    },
    password: {
        type: String, 
        required: [true, 'Password is required!'], 
        minLength: [4, 'Password shold be at least 4 characters long!'], 
    }
});

userSchema.pre('save', async function() {
   this.password = await bcrypt.hash(this.password, 10); 
});

export const User = model('User', userSchema, 'users');