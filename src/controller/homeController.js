import { Router } from "express";
import animalServices from "../services/animalServices.js";

export const homeController = Router();

homeController.get('/', async (req, res) => { 
    const animals = await animalServices.getLatest();

    res.render('home', { 
        animals,
        pageTitle: 'Home Page', 
    });
});