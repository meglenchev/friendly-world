import { Router } from "express";
import authServices from "../services/authServices.js";
import { getErrorMessage } from "../utils/errorUtils.js";

export const authController = Router();

authController.get('/login', (req, res) => {
    res.render('login', { pageTitle: 'Login Page' });
});

authController.get('/register', (req, res) => {
    res.render('register', { pageTitle: 'Register Page' });
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await authServices.register(userData);

        res.redirect('/');
    } catch (err) {
        res.status(400).render('register', { error: errorMessage, user: userData, pageTitle: 'Registration' });
    }
});