import { Router } from "express";

export const authController = Router();

authController.get('/login', (req, res) => {
    res.render('login', {pageTitle: 'Login Page'});
});

authController.get('/register', (req, res) => {
    res.render('register', {pageTitle: 'Register Page'});
});