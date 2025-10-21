import { Router } from "express";

export const homeController = Router();

homeController.get('/', (req, res) => { 
    res.render('home', { pageTitle: 'Home Page' });
});