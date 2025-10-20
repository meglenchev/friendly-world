import { Router } from "express";
import { homeController } from "./controller/homeController.js";

export const routes = Router();

routes.use(homeController);

routes.get('/*splat', (req, res) => {
    res.render('404', {pageTitle: '404 Page not found'});
});