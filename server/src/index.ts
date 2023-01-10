import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import {ExceptionsHandler} from './middlewares/exception.handler';
import {UnknowRoutesHandler} from './middlewares/unknowRoutes.handler';
import Logging from "~/lib/logging";
import Routes from "~/routes";
import * as process from "process";
dotenv.config();

const app = express();

// Cross Origin Resource Sharing
app.use(cors({ origin: process.env.CORS_FRONT_URL, credentials: true }));

// Middleware for cookies
app.use(cookieParser());

// Built-in middleware for json
app.use(express.json());

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', Routes);

// ? Manage unknow routes, need to be the last route
app.all('*', UnknowRoutesHandler);
// ? Handle exceptions, needs to be the last 'use' of Express
app.use(ExceptionsHandler);

//TODO: Fix and use env var
app.listen(process.env.PORT, () => {
    Logging.success(`Server listening on port ${process.env.PORT}`);
});