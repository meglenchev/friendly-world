import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import animalServices from "../services/animalServices.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAnimalOwner } from "../middlewares/animalMiddleware.js";

export const animalController = Router();

animalController.get('/add', isAuth, (req, res) => {
    res.render('animal/create', { pageTitle: 'Create Page' });
});

animalController.post('/add', isAuth, async (req, res) => {
    const userId = req.user.id;
    const animalData = req.body;

    try {
        await animalServices.addAnimal(animalData, userId);

        res.redirect('/animal/dashboard');
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

animalController.get('/:animalId/details', async (req, res) => {
    const animalId = req.params.animalId;

    try {
        const animal = await animalServices.getOne(animalId);

        const isOwner = animal.owner && animal.owner._id.equals(req.user?.id);

        const isDonated = animal.donations.some(donor => donor.equals(req.user?.id));

        res.render('animal/details', {
            animal,
            isOwner,
            isDonated,
            pageTitle: 'Details Page'
        });

    } catch (err) {
        res.render('404', { error: 'Something went wrong!' })
    }
});

animalController.get('/:animalId/edit', isAuth, isAnimalOwner, async (req, res) => {
    const animalId = req.params.animalId;

    try {
        const animal = await animalServices.getOne(animalId);

        res.render('animal/edit', {
            animal,
            pageTitle: 'Edit Page',
        })
    } catch (err) {
        res.render('404', { error: 'Animal not found!' })
    }
});

animalController.post('/:animalId/edit', isAuth, isAnimalOwner, async (req, res) => {
    const animalId = req.params.animalId;
    const animal = req.body;

    try {
        await animalServices.update(animalId, animal);

        res.redirect(`/animal/${animalId}/details`);
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).render('animal/edit', {
            error: errorMessage,
            animal,
        });
    }
});

animalController.get('/:animalId/delete', isAuth, isAnimalOwner, async (req, res) => {
    const animalId = req.params.animalId;

    await animalServices.delete(animalId);

    res.redirect('/animal/dashboard');
});

animalController.get('/:animalId/donation', isAuth, async (req, res) => {
    const animalId = req.params.animalId;

    const userId = req.user.id;

    await animalServices.donation(animalId, userId);

    res.redirect(`/animal/${animalId}/details`);
});

animalController.get('/search', async (req, res) => {
    const filter = req.query;
    
    const animals = await animalServices.getAll(filter);

    res.render('animal/search', { 
        filter, 
        animals, 
        pageTitle: 'Search Page'}
    );
});