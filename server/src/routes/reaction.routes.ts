import { Reaction } from '@prisma/client';
import dotenv from 'dotenv';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logging from '~/lib/logging';
import { prisma } from '~/lib/prisma';
import { validate } from '~/middlewares/validate';
import { createReactionSchema, readReactionSchema, updateReactionSchema } from '~/schemas/reaction.schema';
import { BadRequestException } from '~/utils/exceptions';
import { Reaction as ApiReaction, ReactionInputType as ApiReactionInputType } from '~/types/api';

dotenv.config();

const reactionRoutes = Router();

// Create Reaction : POST /reaction
reactionRoutes.post('/'/*, verifyToken, */, validate(createReactionSchema), async (req, res) => {
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

async function buildReaction(reaction: Reaction) {
    const retReaction: ApiReaction = {
        id: reaction.id,
        name: reaction.name,
        description: reaction.description === null ? undefined : reaction.description,
        serviceId: reaction.serviceId,
    };
    // Add inputs types
    const reactionInputTypes = await prisma.reactionInputType.findMany({
        where: {
            reactionId: reaction.id
        },
    });
    reactionInputTypes.forEach(async (reactionInputType) => {
        const addInputType: ApiReactionInputType = {
            id: reactionInputType.id,
            name: reactionInputType.name,
            type: reactionInputType.type,
            description: reactionInputType.description === null ? undefined : reactionInputType.description,
            regex: reactionInputType.regex === null ? undefined : reactionInputType.regex,
            mandatory: reactionInputType.mandatory,
            reactionId: reactionInputType.reactionId
        };
        if (retReaction.inputs === undefined)
            retReaction.inputs = [];
        retReaction.inputs.push(addInputType);
    });
    return retReaction;
}

// Read Service : GET /reaction/:id
reactionRoutes.get('/:id', validate(readReactionSchema), async (req, res) => {
    const {id} = req.params;
    try {
        const reaction: Reaction | null = await prisma.reaction.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (reaction === null)
            throw new BadRequestException("Reaction not found");
        const retReaction = await buildReaction(reaction);
        Logging.info(`Reaction ${id} read`);
        return res.status(StatusCodes.OK).json(retReaction);
    } catch (_) {
        throw new BadRequestException("Reaction not found");
    }
});

// Update Reaction : POST /reaction/:id
reactionRoutes.post('/:id'/*, verifyToken, */, validate(updateReactionSchema), async (req, res) => {
    const {id} = req.params;
    const {name, description, serviceId}: Reaction = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    try {
        const updatedReaction: Reaction = await prisma.reaction.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name,
                description: description,
                serviceId: serviceId
            }
        });
        Logging.info(`Reaction ${id} updated`);
        return res.status(StatusCodes.OK).json(updatedReaction);
    } catch (_) {
        throw new BadRequestException("Reaction not found");
    }
});

// Delete Reaction : POST /reaction/delete/:id
reactionRoutes.post('/delete/:id'/*, verifyToken, */, async (req, res) => {
    const {id} = req.params;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    try {
        const deletedReaction: Reaction = await prisma.reaction.delete({
            where: {
                id: parseInt(id)
            }
        });
        Logging.info(`Reaction ${id} deleted`);
        return res.status(StatusCodes.OK).json(deletedReaction);
    } catch (_) {
        throw new BadRequestException("Reaction not found");
    }
});

export default reactionRoutes;