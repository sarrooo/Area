import {Request, Response, Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {BadRequestException} from "~/utils/exceptions";
import {prisma} from "~/lib/prisma";
import { searchMax } from '~/types/api';
import Logging from '~/lib/logging';
import dotenv from 'dotenv';
import {validate} from "~/middlewares/validate";
import { createTriggerOutputTypeSchema, deleteTriggerOutputTypeSchema, readTriggerOutputTypeSchema, searchTriggerOutputTypeSchema, updateTriggerOutputTypeSchema } from '~/schemas/trigger_output.schema';
import { TriggerOutputType } from '@prisma/client';
import { verifyToken } from '~/middlewares/auth.handler';

dotenv.config();

const triggerOutputRoutes = Router();

// Create Trigger Output Type : POST /output/trigger
triggerOutputRoutes.post('/', verifyToken, validate(createTriggerOutputTypeSchema), async (req: Request, res: Response) => {
    const {id, triggerId, name, description, type}: TriggerOutputType = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    if (id !== undefined)
        throw new BadRequestException("You cannot specify an id when creating a trigger output type");
    const newTriggerOutputType: TriggerOutputType = await prisma.triggerOutputType.create({
        data: {
            name: name,
            description: description,
            type: type,
            triggerId: triggerId
        }
    });
    Logging.info(`Trigger Output Type ${newTriggerOutputType.id} created`);
    return res.status(StatusCodes.CREATED).json(newTriggerOutputType);
})

// Read Trigger Output Type : GET /output/trigger/:id
triggerOutputRoutes.get('/:id', validate(readTriggerOutputTypeSchema), async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const triggerOutputType: TriggerOutputType | null = await prisma.triggerOutputType.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        Logging.info(`Trigger Output Type ${id} read`);
        return res.status(StatusCodes.OK).json(triggerOutputType);
    } catch (_) {
        throw new BadRequestException("Trigger Output Type not found")
    }
});

// Update Trigger Output Type : POST /output/trigger/:id
triggerOutputRoutes.post('/:id', verifyToken, validate(updateTriggerOutputTypeSchema), async (req: Request, res: Response) => {
    const {id} = req.params;
    const {triggerId, name, description, type}: TriggerOutputType = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    try {
        const triggerOutputType: TriggerOutputType = await prisma.triggerOutputType.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name,
                description: description,
                type: type,
                triggerId: triggerId
            }
        })
        Logging.info(`Trigger Output Type ${id} updated`);
        return res.status(StatusCodes.OK).json(triggerOutputType);
    } catch (_) {
        throw new BadRequestException("Trigger Output Type not found")
    }
});

// Delete Trigger Output Type : POST /output/trigger/delete/:id
triggerOutputRoutes.post('/delete/:id', verifyToken, validate(deleteTriggerOutputTypeSchema), async (req: Request, res: Response) => {
    const {id} = req.params;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    try {
        const triggerOutputType: TriggerOutputType = await prisma.triggerOutputType.delete({
            where: {
                id: parseInt(id)
            }
        })
        Logging.info(`Trigger Output Type ${id} deleted`);
        return res.status(StatusCodes.OK).json(triggerOutputType);
    } catch (_) {
        throw new BadRequestException("Trigger Output Type not found")
    }
});

// Search Trigger Output Type : GET /output/trigger
triggerOutputRoutes.get('/', validate(searchTriggerOutputTypeSchema), async (req: Request, res: Response) => {
    const {max}: searchMax = req.query;
    const triggerOutputTypes: TriggerOutputType[] = await prisma.triggerOutputType.findMany({
        take: max
    })
    Logging.info(`Trigger Output Type searched`);
    return res.status(StatusCodes.OK).json(triggerOutputTypes);
});

export default triggerOutputRoutes;