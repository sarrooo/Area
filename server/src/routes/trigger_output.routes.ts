import {Request, Response, Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {BadRequestException} from "~/utils/exceptions";
import {prisma} from "~/lib/prisma";
import { Output } from '~/types/api';
import Logging from '~/lib/logging';
import dotenv from 'dotenv';

dotenv.config();

const triggerOutputRoutes = Router();

// Create Trigger Output Type : POST /output/trigger
triggerOutputRoutes.post('/', /*verifyToken, */async (req: Request, res: Response) => {
    const {id, trigger_id, name, description, type}: Output = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    if (id !== undefined)
        throw new BadRequestException("You cannot specify an id when creating a trigger output type");
    const newTriggerOutputType = await prisma.triggerOutput.create({
        data: {
            name: name,
            description: description,
            type: type,
            triggerId: trigger_id
        }
    });
    Logging.info(`Trigger Output Type ${newTriggerOutputType.id} created`);
    return res.status(StatusCodes.CREATED).json(newTriggerOutputType);
})

export default triggerOutputRoutes;