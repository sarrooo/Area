import { Reaction } from '@prisma/client';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logging from '~/lib/logging';
import { prisma } from '~/lib/prisma';
import { BadRequestException } from '~/utils/exceptions';
import { Reaction as ApiReaction, ReactionInputType as ApiReactionInputType, searchMax } from '~/types/api';

dotenv.config();

// Create Reaction : POST /reaction
export const createReaction = async (req: Request, res: Response) => {
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
};

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
    for (const reactionInputType of reactionInputTypes) {
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
    }
    return retReaction;
}

// Read Service : GET /reaction/:id
export const readReaction = async (req: Request, res: Response) => {
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
};

// Update Reaction : POST /reaction/:id
export const updateReaction = async (req: Request, res: Response) => {
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
};

// Delete Reaction : POST /reaction/delete/:id
export const deleteReaction = async (req: Request, res: Response) => {
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
};

// Search Reaction : GET /reaction
export const searchReaction = async (req: Request, res: Response) => {
    const {max}: searchMax = req.query;
    const reactions: Reaction[] = await prisma.reaction.findMany({
        take: max
    });
    const retReactions: ApiReaction[] = [];
    for(const reaction of reactions) {
        const retReaction = await buildReaction(reaction);
        retReactions.push(retReaction);
    }
    Logging.info(`Reactions searched`);
    return res.status(StatusCodes.OK).json(retReactions);
};