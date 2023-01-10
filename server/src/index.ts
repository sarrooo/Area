
require('dotenv').config();
import {ExceptionsHandler} from './middlewares/exception.handler';
import {UnknowRoutesHandler} from './middlewares/unknowRoutes.handler';
import config from 'config';
import cors from 'cors';
import express from 'express';

const port = config.get<string>("port");
const app = express();

const frontUrl = config.get<string>("frontUrl");
app.use(cors({ origin: frontUrl, credentials: true }));

// ? Manage unknow routes, need to be the last route
app.all('*', UnknowRoutesHandler);
// ? Handle exceptions, needs to be the last 'use' of Express
app.use(ExceptionsHandler);

app.listen(port, () => {
    console.log("Example app listening on port 3000!");
});