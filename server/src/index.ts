
require('dotenv').config();
import {ExceptionsHandler} from './middlewares/exception.handler';
import {UnknowRoutesHandler} from './middlewares/unknowRoutes.handler';
import config from 'config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

const port = config.get<string>("port");
const app = express();

// Cross Origin Resource Sharing
const frontUrl = config.get<string>("frontUrl");
app.use(cors({ origin: frontUrl, credentials: true }));

// Middleware for cookies
app.use(cookieParser());

// Built-in middleware for json
app.use(express.json());

// ? Manage unknow routes, need to be the last route
app.all('*', UnknowRoutesHandler);
// ? Handle exceptions, needs to be the last 'use' of Express
app.use(ExceptionsHandler);

app.listen(port, () => {
    console.log("Example app listening on port 3000!");
});