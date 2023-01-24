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

export default trireaRoutes;