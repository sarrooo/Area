import { Trigger } from '@prisma/client';
import dotenv from 'dotenv';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logging from '~/lib/logging';
import { prisma } from '~/lib/prisma';
import { validate } from '~/middlewares/validate';
import { createTriggerSchema } from '~/schemas/trigger.schema';
import { BadRequestException } from '~/utils/exceptions';
import { Trigger as ApiTrigger,
    TriggerInputType as ApiTriggerInputType,
    TriggerOutputType as ApiTriggerOutputType } from '~/types/api';

dotenv.config();

const triggerRoutes = Router();

// Create Trigger : POST /trigger
triggerRoutes.post('/'/*, verifyToken, */, validate(createTriggerSchema), async (req: Request, res: Response) => {
    const {id, name, description, serviceId}: Trigger = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    if (id !== undefined)
        throw new BadRequestException("You cannot specify an id when creating a trigger");
    const newTrigger: Trigger = await prisma.trigger.create({
        data: {
            name: name,
            description: description,
            serviceId: serviceId
        }
    });
    Logging.info(`Trigger ${newTrigger.id} created`);
    return res.status(StatusCodes.CREATED).json(newTrigger);
});

async function buildTrigger(trigger: Trigger) {
    const retTrigger: ApiTrigger = {
        id: trigger.id,
        name: trigger.name,
        description: trigger.description === null ? undefined : trigger.description,
        serviceId: trigger.serviceId,
    };
    // Add inputs types
    const triggerInputTypes = await prisma.triggerInputType.findMany({
        where: {
            triggerId: trigger.id
        },
    });
    triggerInputTypes.forEach((triggerInputType) => {
        const addInputType: ApiTriggerInputType = {
            id: triggerInputType.id,
            name: triggerInputType.name,
            type: triggerInputType.type,
            description: triggerInputType.description === null ? undefined : triggerInputType.description,
            regex: triggerInputType.regex === null ? undefined : triggerInputType.regex,
            mandatory: triggerInputType.mandatory,
            triggerId: triggerInputType.triggerId
        };
        if (retTrigger.inputs === undefined)
            retTrigger.inputs = [];
        retTrigger.inputs.push(addInputType);
    });
    // Add outputs types
    const triggerOutputTypes = await prisma.triggerOutputType.findMany({
        where: {
            triggerId: trigger.id
        }
    });
    triggerOutputTypes.forEach((triggerOutputType) => {
        const addOutputType: ApiTriggerOutputType = {
            id: triggerOutputType.id,
            name: triggerOutputType.name,
            type: triggerOutputType.type,
            description: triggerOutputType.description === null ? undefined : triggerOutputType.description,
            triggerId: triggerOutputType.triggerId
        };
        if (retTrigger.outputs === undefined)
            retTrigger.outputs = [];
        retTrigger.outputs.push(addOutputType);
    });
    return retTrigger;
}

// Read Service : GET /service/:id
triggerRoutes.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const trigger: Trigger | null = await prisma.trigger.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (trigger === null)
            throw new BadRequestException("Trigger not found");
        const retTrigger = await buildTrigger(trigger);
        Logging.info(`Trigger ${id} read`);
        return res.status(StatusCodes.OK).json(retTrigger);
    } catch (_) {
        throw new BadRequestException("Trigger not found")
    }
});

export default triggerRoutes; 