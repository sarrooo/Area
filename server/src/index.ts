import aboutRoutes from "~/routes/about.routes";
import dotenv from 'dotenv'
dotenv.config();
import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import {ExceptionsHandler} from './middlewares/exception.handler';
import {UnknowRoutesHandler} from './middlewares/unknowRoutes.handler';
import Routes from "~/routes";
import * as process from "process";
import config from "config";
import '~/jobs/handler.job';

const port = config.get<number>('port');

const app = express();

const fs = require('fs');
const http = require('http');
const https = require('https');

// Cross Origin Resource Sharing
app.use(cors({ origin: '*' }));

// Middleware for cookies
app.use(cookieParser());

// Built-in middleware for json
app.use(express.json());

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', aboutRoutes);
app.use('/api', Routes);

// ? Manage unknow routes, need to be the last route
app.all('*', UnknowRoutesHandler);
// ? Handle exceptions, needs to be the last 'use' of Express
app.use(ExceptionsHandler);

const httpServer = http.createServer(app);
httpServer.listen(port);

// Certs
if (fs.existsSync("/app/certs/privkey.pem")) {
    const privateKey  = fs.readFileSync('/app/certs/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/app/certs/cert.pem', 'utf8');
    const ca = fs.readFileSync('/app/certs/chain.pem', 'utf8');
    const credentials = {key: privateKey, cert: certificate, ca: ca};
    
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(8443);
}

module.exports = app;
