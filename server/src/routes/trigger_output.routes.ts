import {Request, Response, Router} from 'express';
import { StatusCodes } from 'http-status-codes';

const triggerOutputRoutes = Router();

// Create Trigger Output Type : POST /output/trigger
triggerOutputRoutes.post('/', async (req: Request, res: Response) => {
    res.send("ok");
    return res.status(StatusCodes.OK);
})

export default triggerOutputRoutes;