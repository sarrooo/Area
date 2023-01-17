import dotenv from 'dotenv';
import {Request, Response, Router} from 'express';

dotenv.config();

const triggerInputRoutes = Router();

export default triggerInputRoutes;