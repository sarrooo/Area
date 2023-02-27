import dotenv from "dotenv";
import {Router} from "express";
import {githubOAuthHandler} from "~/controllers/auth/github.auth.controller";
import {twitterOAuthHandler} from "~/controllers/auth/twitter.auth.controller";
import {googleOAuthHandler} from "~/controllers/auth/google.auth.controller";
import {spotifyConnectHandler} from "~/controllers/connect/spotify.connect.controller";
import {googleConnectHandler} from "~/controllers/connect/google.connect.controller";
import {twitterConnectHandler} from "~/controllers/connect/twitter.connect.controller";

dotenv.config();

const sessionRouter = Router();

//AUTH
sessionRouter.get('/oauth/google', googleOAuthHandler);
sessionRouter.get('/oauth/github', githubOAuthHandler);
sessionRouter.get('/oauth/twitter', twitterOAuthHandler);

//CONNECT
sessionRouter.get('/oauth/connect/spotify', spotifyConnectHandler)
sessionRouter.get('/oauth/connect/google', googleConnectHandler)
sessionRouter.get('/oauth/connect/twitter', twitterConnectHandler)

export default sessionRouter;