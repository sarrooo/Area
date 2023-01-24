import dotenv from 'dotenv';
import {Request, Response, Router} from 'express';
import { searchMax } from '~/types/api';
import { BadRequestException } from '~/utils/exceptions';
import {prisma} from "~/lib/prisma";
import Logging from '~/lib/logging';
import {StatusCodes} from 'http-status-codes';
import {validate} from "~/middlewares/validate";
import { createTriggerInputTypeSchema, deleteTriggerInputTypeSchema, readTriggerInputTypeSchema, searchTriggerInputTypeSchema, updateTriggerInputTypeSchema } from '~/schemas/trigger_input.schema';
import { TriggerInputType } from '@prisma/client';
import { verifyToken } from '~/middlewares/auth.handler';

dotenv.config();

const triggerInputRoutes = Router();

// Create Trigger Input Type : POST /input/trigger
triggerInputRoutes.post('/', verifyToken, validate(createTriggerInputTypeSchema), async (req: Request, res: Response) => {
    const {id, triggerId, name, description, regex, mandatory, type}: TriggerInputType = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    if (id !== undefined)
        throw new BadRequestException("You cannot specify an id when creating a trigger output type");
    const newTriggerInputType: TriggerInputType = await prisma.triggerInputType.create({
        data: {
            name: name,
            description: description,
            regex: regex,
            mandatory: mandatory,
            type: type,
            triggerId: triggerId
        }
    });
    Logging.info(`Trigger Input Type ${newTriggerInputType.id} created`);
    return res.status(StatusCodes.CREATED).json(newTriggerInputType);
});

// Read Trigger Input Type : GET /input/trigger/:id
triggerInputRoutes.get('/:id', validate(readTriggerInputTypeSchema), async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const triggerInputType: TriggerInputType | null = await prisma.triggerInputType.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        Logging.info(`Trigger Input Type ${id} read`);
        return res.status(StatusCodes.OK).json(triggerInputType);
    } catch (_) {
        throw new BadRequestException("Trigger Output Type not found")
    }
});

// Update Trigger Input Type : POST /input/trigger/:id
triggerInputRoutes.post('/:id', verifyToken, validate(updateTriggerInputTypeSchema), async (req: Request, res: Response) => {
    const {id} = req.params;
    const {triggerId, name, description, regex, mandatory, type}: TriggerInputType = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    try {
        const triggerInputType: TriggerInputType = await prisma.triggerInputType.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name,
                description: description,
                regex: regex,
                mandatory: mandatory,
                type: type,
                triggerId: triggerId
            }
        });
        Logging.info(`Trigger Input Type ${id} updated`);
        return res.status(StatusCodes.OK).json(triggerInputType);
    } catch (_) {
        throw new BadRequestException("Trigger Input Type not found")
    }
});

// Detele Trigger Input Type : POST /input/trigger/delete/:id
triggerInputRoutes.post('/delete/:id', verifyToken, validate(deleteTriggerInputTypeSchema), async (req: Request, res: Response) => {
    const {id} = req.params;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    try {
        const triggerInputType: TriggerInputType = await prisma.triggerInputType.delete({
            where: {
                id: parseInt(id)
            }
        });
        Logging.info(`Trigger Input Type ${id} deleted`);
        return res.status(StatusCodes.OK).json(triggerInputType);
    } catch (_) {
        throw new BadRequestException("Trigger Input Type not found")
    }
});

// Search Trigger Input Type : GET /input/trigger
triggerInputRoutes.get('/', validate(searchTriggerInputTypeSchema), async (req: Request, res: Response) => {
    const {max}: searchMax = req.query;
    const triggerInputTypes: TriggerInputType[] = await prisma.triggerInputType.findMany({
        take: max
    });
    Logging.info(`Trigger Input Type searched`);
    return res.status(StatusCodes.OK).json(triggerInputTypes);
});

export default triggerInputRoutes;