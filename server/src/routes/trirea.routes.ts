import { Trirea, TrireaReactionInput, TrireaTriggerInput } from '@prisma/client';
import dotenv from 'dotenv';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logging from '~/lib/logging';
import { prisma } from '~/lib/prisma';
import { validate } from '~/middlewares/validate';
import { Trirea as ApiTrirea } from '~/types/api';
import { BadRequestException } from '~/utils/exceptions';
import { createTrireaSchema } from '~/schemas/trirea.schema';
dotenv.config();

const trireaRoutes = Router();

// Create Trirea : POST /trirea
trireaRoutes.post('/'/*, verifyToken, */, validate(createTrireaSchema), async (req: Request, res: Response) => {
    const {id, enabled, userId, triggerId, reactionId, triggerInputs, reactionInputs}: ApiTrirea = req.body;
    if (id !== undefined)
        throw new BadRequestException("You cannot specify an id when creating a trirea");
    if (userId !== undefined)
        throw new BadRequestException("You cannot specify a user id when creating a trirea");
    // TODO GET real user id with the token
    const realUserId = 0;
    const newTrirea: Trirea = await prisma.trirea.create({
        data: {
            enabled: enabled,
            userId: realUserId,
            triggerId: triggerId,
            reactionId: reactionId,
        }
    });
    const retTrirea: ApiTrirea = {
        id: newTrirea.id,
        createdAt: newTrirea.createdAt,
        updatedAt: newTrirea.updatedAt,
        prevTriggerData: newTrirea.prevTriggerData === null ? undefined : newTrirea.prevTriggerData,
        enabled: newTrirea.enabled,
        userId: newTrirea.userId,
        triggerId: newTrirea.triggerId,
        reactionId: newTrirea.reactionId,
        triggerInputs: [],
        reactionInputs: []
    };
    // Add trigger inputs
    triggerInputs.forEach(async (trigger) => {
        if (trigger.id !== undefined)
            throw new BadRequestException("You cannot specify an id when creating a trirea trigger input");
        const newInput: TrireaTriggerInput = await prisma.trireaTriggerInput.create({
            data: {
                value: trigger.value,
                trireaId: newTrirea.id,
                triggerInputTypeId: trigger.triggerInputTypeId
            }
        });
        retTrirea.triggerInputs.push({
            id: newInput.id,
            value: newInput.value === null ? undefined : newInput.value,
            trireaId: newInput.trireaId,
            triggerInputTypeId: newInput.triggerInputTypeId
        });
    });
    // Add reaction inputs
    reactionInputs.forEach(async (reaction) => {
        if (reaction.id !== undefined)
            throw new BadRequestException("You cannot specify an id when creating a trirea reaction input");
        const newInput: TrireaReactionInput = await prisma.trireaReactionInput.create({
            data: {
                value: reaction.value,
                linkedToId: reaction.linkedToId,
                trireaId: newTrirea.id,
                reactionInputTypeId: reaction.reactionInputTypeId
            }
        });
        retTrirea.reactionInputs.push({
            id: newInput.id,
            value: newInput.value === null ? undefined : newInput.value,
            trireaId: newInput.trireaId,
            linkedToId: newInput.linkedToId === null ? undefined : newInput.linkedToId,
            reactionInputTypeId: newInput.reactionInputTypeId
        });
    });
    // Return
    Logging.info(`Created trirea ${newTrirea.id}`);
    return res.status(StatusCodes.CREATED).json(retTrirea);
});

async function buildTrirea(trirea: Trirea) {
    const retTrirea: ApiTrirea = {
        id: trirea.id,
        createdAt: trirea.createdAt,
        updatedAt: trirea.updatedAt,
        prevTriggerData: trirea.prevTriggerData === null ? undefined : newTrirea.prevTriggerData,
        enabled: trirea.enabled,
        userId: trirea.userId,
        triggerId: trirea.triggerId,
        reactionId: trirea.reactionId,
        triggerInputs: [],
        reactionInputs: []
    };
    // Add trigger inputs
    const triggerInputs: TrireaTriggerInput[] = await prisma.trireaTriggerInput.findMany({
        where: {
            trireaId: trirea.id
        }
    });
    triggerInputs.forEach(async (trigger) => {
        retTrirea.triggerInputs.push({
            id: trigger.id,
            value: trigger.value === null ? undefined : trigger.value,
            trireaId: trigger.trireaId,
            triggerInputTypeId: trigger.triggerInputTypeId
        });
    });
    // Add reaction inputs
    const reactionInputs: TrireaReactionInput[] = await prisma.trireaReactionInput.findMany({
        where: {
            trireaId: trirea.id
        }
    });
    reactionInputs.forEach(async (reaction) => {
        retTrirea.reactionInputs.push({
            id: reaction.id,
            value: reaction.value === null ? undefined : reaction.value,
            trireaId: reaction.trireaId,
            linkedToId: reaction.linkedToId === null ? undefined : reaction.linkedToId,
            reactionInputTypeId: reaction.reactionInputTypeId
        });
    });
    return retTrirea;
}

// Read Trirea : GET /trirea/:id
trireaRoutes.get('/:id'/*, verifyToken, */, async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const trirea: Trirea | null = await prisma.trirea.findUnique({
            where: {
                id: parseInt(id)
            },
        });
        if (trirea === null)
            throw new BadRequestException("Trirea not found");
        // ? Check if user can access to this trirea
        // TODO GET real user id with the token
        const realUserId = 0;
        if (/*!isAdmin(user) && */ realUserId !== trirea.userId)
            throw new BadRequestException("You cannot access this trirea");
        const retTrirea = await buildTrirea(trirea);
        Logging.info(`Read trirea ${trirea.id}`);
        return res.status(StatusCodes.OK).json(retTrirea);
    } catch (_) {
        throw new BadRequestException("Trirea not found");
    }
});

export default trireaRoutes;