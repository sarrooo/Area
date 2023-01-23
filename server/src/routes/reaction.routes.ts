import { Reaction } from '@prisma/client';
import dotenv from 'dotenv';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logging from '~/lib/logging';
import { prisma } from '~/lib/prisma';
import { BadRequestException } from '~/utils/exceptions';

dotenv.config();

const reactionRoutes = Router();

// Create Reaction : POST /reaction
reactionRoutes.post('/'/*, verifyToken, */, async (req, res) => {
    const {id, name, description, serviceId}: Reaction = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    if (id !== undefined)
        throw new BadRequestException("You cannot specify an id when creating a reaction");
    const newReaction: Reaction = await prisma.reaction.create({
        data: {
            name: name,
            description: description,
            serviceId: serviceId
        }
    });
    Logging.info(`Reaction ${newReaction.id} created`);
    return res.status(StatusCodes.CREATED).json(newReaction);
});

export default reactionRoutes;