import dotenv from "dotenv";
import {Request, Response, Router} from "express";
import {googleOAuthHandler} from "~/controllers/auth.controller";

dotenv.config();

const sessionRouter = Router();

sessionRouter.get('/oauth/google', googleOAuthHandler);

export default sessionRouter;