import dotenv from "dotenv";
import {Request, Response, Router} from "express";
import {githubOAuthHandler, googleOAuthHandler, twitterOAuthHandler} from "~/controllers/auth.controller";

dotenv.config();

const sessionRouter = Router();

sessionRouter.get('/oauth/google', googleOAuthHandler);
sessionRouter.get('/oauth/github', githubOAuthHandler);
sessionRouter.get('/oauth/twitter', twitterOAuthHandler);

export default sessionRouter;