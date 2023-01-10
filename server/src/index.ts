import express from 'npm:express'
import { ExceptionsHandler } from './middlewares/exception.handler.ts';
import { UnknowRoutesHandler } from './middlewares/unknowRoutes.handler.ts'

const app = express();

// ? Manage unknow routes, need to be the last route
app.all('*', UnknowRoutesHandler);

// ? Handle exceptions, needs to be the last 'use' of Express
app.use(ExceptionsHandler);

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});