import { Router } from "express";
import authServices from "../services/authServices.js";
import { getErrorMessage } from "../utils/errorUtils.js";

export const authController = Router();

authController.get('/login', (req, res) => {
    res.render('login', { pageTitle: 'Login Page' });
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authServices.login(email, password);

        res.cookie('auth', token);

        res.redirect('/')

    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).render('login', {error: errorMessage, email, pageTitle: 'Login Page'})
    }
});

authController.get('/register', (req, res) => {
    res.render('register', { pageTitle: 'Register Page' });
});

authController.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authServices.register(email, password);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('register', { error: errorMessage, user: userData, pageTitle: 'Registration' });
    }
});

authController.get('/logout', (req, res) => {
    // Clear Auth Cookie
    res.clearCookie('auth');

    // TODO: Invalidate JWT Token
    res.redirect('/');
});