import {ExceptionsHandler} from './middlewares/exception.handler';
import {UnknowRoutesHandler} from './middlewares/unknowRoutes.handler';
import cors from 'cors';
import express from 'express';

const app = express();

// ? Manage unknow routes, need to be the last route
app.all('*', UnknowRoutesHandler);
// ? Handle exceptions, needs to be the last 'use' of Express
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(ExceptionsHandler);

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});