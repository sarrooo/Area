import dotenv from 'dotenv';
import {Request, Response, Router} from 'express';
import { Input } from '~/types/api';
import { BadRequestException } from '~/utils/exceptions';
import {prisma} from "~/lib/prisma";
import Logging from '~/lib/logging';
import {StatusCodes} from 'http-status-codes';
import {validate} from "~/middlewares/validate";
import { createTriggerInputTypeSchema } from '~/schemas/trigger_input.schema';

dotenv.config();

const triggerInputRoutes = Router();

// Create Trigger Input Type : POST /input/trigger
triggerInputRoutes.post('/'/*, verifyToken, */, validate(createTriggerInputTypeSchema), async (req: Request, res: Response) => {
    const {id, trigger_id, name, description, regex, mandatory, type}: Input = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    if (id !== undefined)
        throw new BadRequestException("You cannot specify an id when creating a trigger output type");
    const newTriggerInputType = await prisma.triggerInput.create({
        data: {
            name: name,
            description: description,
            regex: regex,
            mandatory: mandatory,
            type: type,
            triggerId: trigger_id
        }
    });
    Logging.info(`Trigger Input Type ${newTriggerInputType.id} created`);
    return res.status(StatusCodes.CREATED).json(newTriggerInputType);
});

export default triggerInputRoutes;