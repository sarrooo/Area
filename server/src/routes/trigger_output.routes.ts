import {Request, Response, Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {BadRequestException} from "~/utils/exceptions";
import {prisma} from "~/lib/prisma";
import { Output, searchMax } from '~/types/api';
import Logging from '~/lib/logging';
import dotenv from 'dotenv';
import {validate} from "~/middlewares/validate";
import { createTriggerOutputTypeSchema, readTriggerOutputTypeSchema, searchTriggerOutputTypeSchema } from '~/schemas/trigger_output.schema';

dotenv.config();

const triggerOutputRoutes = Router();

// Create Trigger Output Type : POST /output/trigger
triggerOutputRoutes.post('/'/*, verifyToken, */, validate(createTriggerOutputTypeSchema), async (req: Request, res: Response) => {
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

// Read Trigger Output Type : GET /output/trigger/:id
triggerOutputRoutes.get('/:id', validate(readTriggerOutputTypeSchema), async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const triggerOutputType = await prisma.triggerOutput.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        return res.status(StatusCodes.OK).json(triggerOutputType);
    } catch (_) {
        throw new BadRequestException("Trigger Output Type not found")
    }
});

// Search Trigger Output Type : GET /output/trigger
triggerOutputRoutes.get('/', validate(searchTriggerOutputTypeSchema), async (req: Request, res: Response) => {
    const {max}: searchMax = req.query;
    const triggerOutputTypes = await prisma.triggerOutput.findMany({
        take: max
    })
    return res.status(StatusCodes.OK).json(triggerOutputTypes);
});

export default triggerOutputRoutes;