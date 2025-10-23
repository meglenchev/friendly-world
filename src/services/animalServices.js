import { Animal } from "../models/Animal.js"

export default {
    getAll() {
        return Animal.find();
    },
    addAnimal(animalData, userId) {
        return Animal.create({
            ...animalData,
            owner: userId,
        });
    },
}