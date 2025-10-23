import { Schema, model } from "mongoose";

const animalSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Name is required!'], 
    },
    years: {
        type: Number, 
        required: [true, 'Years is required!'], 
    }, 
    kind: {
        type: String, 
        required: [true, 'Kind is required!'], 
    },
    image: {
        type: String, 
        required: [true, 'Image is required!'], 
    },
    need: {
        type: String, 
        required: [true, 'Need is required!'], 
    },
    location: {
        type: String, 
        required: [true, 'Location is required!'], 
    },
    description: {
        type: String, 
        required: [true, 'Description is required!'], 
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

export const Animl = model('Animal', animalSchema, 'animals');