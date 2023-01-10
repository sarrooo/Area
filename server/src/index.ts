import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import {ExceptionsHandler} from './middlewares/exception.handler';
import {UnknowRoutesHandler} from './middlewares/unknowRoutes.handler';
import Logging from "~/lib/logging";
dotenv.config();

const app = express();

// Cross Origin Resource Sharing
//TODO: FIX and use env var
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Middleware for cookies
app.use(cookieParser());

// Built-in middleware for json
app.use(express.json());

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Routes

// ? Manage unknow routes, need to be the last route
app.all('*', UnknowRoutesHandler);
// ? Handle exceptions, needs to be the last 'use' of Express
app.use(ExceptionsHandler);

//TODO: Fix and use env var
app.listen(3000, () => {
    Logging.success(`Server listening on port ${3000}`);
});