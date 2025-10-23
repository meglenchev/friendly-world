import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";

export const animalController = Router();

animalController.get('/add', isAuth, async (req, res) => {
    const ownerId = req.user.id;
    
    res.render('animal/create', { pageTitle: 'Create Page'});
});