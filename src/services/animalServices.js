import { Animal } from "../models/Animal.js"

export default {
    getAll() {
        return Animal.find();
    },
    getLatest() {
        return Animal.find().sort({_id: -1}).limit(3);
    },
    addAnimal(animalData, userId) {
        return Animal.create({
            ...animalData,
            owner: userId,
        });
    },
}