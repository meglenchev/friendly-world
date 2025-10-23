import animalServices from "../services/animalServices.js";

export async function isAnimalOwner(req, res, next) {
    const animalId = req.params.animalId;

    const animal = await animalServices.getOne(animalId);

    if (!animal.owner.equals(req.user.id)) {
        return res.status(401).render('404', { error: 'Only owner can edit this animal!' })
    }

    req.animal = animal;

    next();
}