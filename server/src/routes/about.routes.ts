import {Request, Response, Router} from "express";
import {Server, Client} from "~/types/about";
import {prisma} from "~/lib/prisma";
import {StatusCodes} from "http-status-codes";
import {about} from "~/controllers/about.controller";

const aboutRoutes = Router();

aboutRoutes.get('/about.json', about);

export default aboutRoutes;