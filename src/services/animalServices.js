import { Animal } from "../models/Animal.js"

export default {
    getAll() {
        return Animal.find();
    },
    getLatest() {
        return Animal.find().sort({ _id: -1 }).limit(3);
    },
    addAnimal(animalData, userId) {
        return Animal.create({
            ...animalData,
            owner: userId,
        });
    },
    getOne(animalId) {
        return Animal.findById(animalId);
    },
    update(animalId, animal) {
        return Animal.findByIdAndUpdate(animalId, animal, { runValidators: true });
    },
    delete(animalId) {
        return Animal.findByIdAndDelete(animalId);
    },
    donation(animalId, userId) {
        return Animal.findByIdAndUpdate(animalId, { $push: { donations: userId } });
    }
}