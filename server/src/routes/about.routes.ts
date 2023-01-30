import {Router} from "express";
import {about} from "~/controllers/about.controller";

const aboutRoutes = Router();

aboutRoutes.get('/about.json', about);

export default aboutRoutes;