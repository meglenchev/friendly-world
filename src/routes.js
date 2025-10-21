import { Router } from "express";
import { homeController } from "./controller/homeController.js";
import { authController } from "./controller/authController.js";

export const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);

routes.get('/*splat', (req, res) => {
    res.status(404).render('404', { pageTitle: '404 Page not found' });
});