import { Trigger } from '@prisma/client';
import dotenv from 'dotenv';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logging from '~/lib/logging';
import { prisma } from '~/lib/prisma';
import { validate } from '~/middlewares/validate';
import { createTriggerSchema } from '~/schemas/trigger.schema';
import { BadRequestException } from '~/utils/exceptions';

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

export default triggerRoutes; 