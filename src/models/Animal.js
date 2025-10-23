import { Schema, Types, model } from "mongoose";

const animalSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Name is required!'], 
        minLength: [2, 'Name shold be at least 2 characters long!'], 
    },
    years: {
        type: Number, 
        required: [true, 'Years is required!'], 
        minLength: [1, 'Years shold be at least 1 characters long!'], 
        maxLength: [100, 'Years must be no longer than 100 characters.!'],
    }, 
    kind: {
        type: String, 
        required: [true, 'Kind is required!'], 
        minLength: [3, 'Kind shold be at least 3 characters long!'],
    },
    image: {
        type: String, 
        required: [true, 'Image is required!'], 
        match: [/^https?:\/\//, 'Image Url is invalid'],
    },
    need: {
        type: String, 
        required: [true, 'Need is required!'], 
        minLength: [3, 'Need shold be at least 3 characters long!'], 
        maxLength: [20, 'Need must be no longer than 20 characters.!'],
    },
    location: {
        type: String, 
        required: [true, 'Location is required!'], 
        minLength: [5, 'Location shold be at least 5 characters long!'], 
        maxLength: [15, 'Location must be no longer than 15 characters.!'],
    },
    description: {
        type: String, 
        required: [true, 'Description is required!'], 
        minLength: [5, 'Description shold be at least 5 characters long!'], 
        maxLength: [50, 'Description must be no longer than 50 characters.!'],
    },
    donations: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User', 
        required: [true, 'Animal must have an owner!']
    }
});

export const Animal = model('Animal', animalSchema, 'animals');