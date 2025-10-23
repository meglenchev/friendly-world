import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import animalServices from "../services/animalServices.js";
import { getErrorMessage } from "../utils/errorUtils.js";

export const animalController = Router();

animalController.get('/add', isAuth, (req, res) => {
    res.render('animal/create', { pageTitle: 'Create Page'});
});

animalController.post('/add', isAuth, async (req, res) => {
    const userId = req.user.id;
    const animalData = req.body;

    try {
        await animalServices.addAnimal(animalData, userId);

        res.redirect('/dashboard');
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).render('animal/create', {
            error: errorMessage,
            animal: animalData,
            pageTitle: 'Create Page'
        });
    }
});

animalController.get('/dashboard', async (req, res) => {
    const animals = await animalServices.getAll();

    res.render('animal/dashboard', {
        animals, 
        pageTitle: 'Dashboard Page',
    });
});