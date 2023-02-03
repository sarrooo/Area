import { Trirea, TrireaReactionInput, TrireaTriggerInput } from '@prisma/client';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { prisma } from '~/lib/prisma';
import { BadRequestException } from '~/utils/exceptions';
import { searchInfos, Trirea as ApiTrirea } from '~/types/api';
import Logging from '~/lib/logging';
import { StatusCodes } from 'http-status-codes';

dotenv.config();

// Create Trirea : POST /trirea
export const createTrirea = async (req: Request, res: Response) => {
    const {id, enabled, name, userId, triggerId, reactionId, triggerInputs, reactionInputs}: ApiTrirea = req.body;
    if (id !== undefined)
        throw new BadRequestException("You cannot specify an id when creating a trirea");
    if (userId !== undefined)
        throw new BadRequestException("You cannot specify a user id when creating a trirea");
    const realUserId = req.user.id;
    if (realUserId === undefined)
        throw new BadRequestException("You must be logged in to create a trirea");
    console.log("REAL_USER_ID: ",realUserId)
    console.log("triggerId: ",triggerId)
    console.log("reactionId: ",reactionId)
    const newTrirea: Trirea = await prisma.trirea.create({
        data: {
            name: name,
            enabled: enabled,
            userId: realUserId === undefined ? -1 : realUserId,
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
        name: newTrirea.name,
        userId: newTrirea.userId,
        triggerId: newTrirea.triggerId,
        reactionId: newTrirea.reactionId,
        triggerInputs: [],
        reactionInputs: []
    };
    // Add trigger inputs

    for(const trigger of triggerInputs) {
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
    }

    // triggerInputs.forEach(async (trigger) => {
    //     if (trigger.id !== undefined)
    //         throw new BadRequestException("You cannot specify an id when creating a trirea trigger input");
    //     const newInput: TrireaTriggerInput = await prisma.trireaTriggerInput.create({
    //         data: {
    //             value: trigger.value,
    //             trireaId: newTrirea.id,
    //             triggerInputTypeId: trigger.triggerInputTypeId
    //         }
    //     });
    //     retTrirea.triggerInputs.push({
    //         id: newInput.id,
    //         value: newInput.value === null ? undefined : newInput.value,
    //         trireaId: newInput.trireaId,
    //         triggerInputTypeId: newInput.triggerInputTypeId
    //     });
    // });

    // Add reaction inputs

    for (const reaction of reactionInputs) {
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
    }
    // reactionInputs.forEach(async (reaction) => {
    //     if (reaction.id !== undefined)
    //         throw new BadRequestException("You cannot specify an id when creating a trirea reaction input");
    //     const newInput: TrireaReactionInput = await prisma.trireaReactionInput.create({
    //         data: {
    //             value: reaction.value,
    //             linkedToId: reaction.linkedToId,
    //             trireaId: newTrirea.id,
    //             reactionInputTypeId: reaction.reactionInputTypeId
    //         }
    //     });
    //     retTrirea.reactionInputs.push({
    //         id: newInput.id,
    //         value: newInput.value === null ? undefined : newInput.value,
    //         trireaId: newInput.trireaId,
    //         linkedToId: newInput.linkedToId === null ? undefined : newInput.linkedToId,
    //         reactionInputTypeId: newInput.reactionInputTypeId
    //     });
    // });
    // Return
    Logging.info(`Created trirea ${newTrirea.id}`);
    return res.status(StatusCodes.CREATED).json(retTrirea);
};

async function buildTrirea(trirea: Trirea) {
    const retTrirea: ApiTrirea = {
        id: trirea.id,
        createdAt: trirea.createdAt,
        updatedAt: trirea.updatedAt,
        prevTriggerData: trirea.prevTriggerData === null ? undefined : trirea.prevTriggerData,
        enabled: trirea.enabled,
        name: trirea.name,
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
export const readTrirea = async (req: Request, res: Response) => {
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
        const realUserId = req.user.id;
        if (/*!isAdmin(user) && */ realUserId !== trirea.userId)
            throw new BadRequestException("You cannot access this trirea");
        const retTrirea = await buildTrirea(trirea);
        Logging.info(`Read trirea ${trirea.id}`);
        return res.status(StatusCodes.OK).json(retTrirea);
    } catch (_) {
        throw new BadRequestException("Trirea not found");
    }
};

// Update Trirea : POST /trirea/:id
export const updateTrirea = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {enabled, userId, triggerId, reactionId, triggerInputs, reactionInputs}: ApiTrirea = req.body;
    try {
        const trirea: Trirea | null = await prisma.trirea.findUnique({
            where: {
                id: parseInt(id)
            },
        });
        // ? Check if user can access to this trirea
        if (trirea === null)
            throw new BadRequestException("Trirea not found");
        if (/*!isAdmin(user)*/userId !== trirea.userId && req.user.id !== trirea.userId)
            throw new BadRequestException("You cannot update this trirea");
        // Add or update trigger inputs
        triggerInputs.forEach(async (trigger) => {
            await prisma.trireaTriggerInput.upsert({
                where: {
                    id: trigger.id
                },
                update: {
                    value: trigger.value,
                    trireaId: trirea.id,
                    triggerInputTypeId: trigger.triggerInputTypeId
                },
                create: {
                    value: trigger.value,
                    trireaId: trirea.id,
                    triggerInputTypeId: trigger.triggerInputTypeId
                },
            });
        });
        // Add or update reaction inputs
        reactionInputs.forEach(async (reaction) => {
            await prisma.trireaReactionInput.upsert({
                where: {
                    id: reaction.id
                },
                update: {
                    value: reaction.value,
                    linkedToId: reaction.linkedToId,
                    trireaId: trirea.id,
                    reactionInputTypeId: reaction.reactionInputTypeId
                },
                create: {
                    value: reaction.value,
                    linkedToId: reaction.linkedToId,
                    trireaId: trirea.id,
                    reactionInputTypeId: reaction.reactionInputTypeId
                },
            });
        });
        // Update trirea
        const updatedTrirea: Trirea = await prisma.trirea.update({
            where: {
                id: parseInt(id)
            },
            data: {
                enabled: enabled,
                userId: userId,
                triggerId: triggerId,
                reactionId: reactionId
            }
        });
        const retTrirea = await buildTrirea(updatedTrirea);
        Logging.info(`Updated trirea ${updatedTrirea.id}`);
        return res.status(StatusCodes.OK).json(retTrirea);
    } catch (_) {
        throw new BadRequestException("Trirea not found");
    }
};

// Delete Trirea : POST /trirea/delete/:id
export const deleteTrirea = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const trirea: Trirea | null = await prisma.trirea.findUnique({
            where: {
                id: parseInt(id)
            },
        });
        // ? Check if user can access to this trirea
        if (trirea === null)
            throw new BadRequestException("Trirea not found");
        if (/*!isAdmin(user)*/req.user.id !== trirea.userId)
            throw new BadRequestException("You cannot delete this trirea");
        const deletedTrirea: Trirea = await prisma.trirea.delete({
            where: {
                id: parseInt(id)
            }
        });
        Logging.info(`Deleted trirea ${deletedTrirea.id}`);
        return res.status(StatusCodes.OK).json(deletedTrirea);
    } catch (_) {
        throw new BadRequestException("Trirea not found");
    }
};

// Search Trirea : GET /trirea
export const searchTrirea = async (req: Request, res: Response) => {
    const {active, max, userId}: searchInfos = req.body;
    if (/*!isAdmin(user)*/userId !== undefined && req.user.id !== userId)
        throw new BadRequestException("You search for others trireas");
    const trireas: Trirea[] = await prisma.trirea.findMany({
        where: {
            userId: userId ? userId : 1,
            enabled: active ? active : true
        },
        take: max
    });
    const retTrireas: ApiTrirea[] = [];
    for(let i = 0; i < trireas.length; i++) {
        const retTrirea: ApiTrirea = await buildTrirea(trireas[i]);
        retTrireas.push(retTrirea);
    }
    // trireas.forEach(async (trirea) => {
    //     const retTrirea: ApiTrirea = await buildTrirea(trirea);
    //     retTrireas.push(retTrirea);
    // });
    Logging.info(`Searched trireas for user ${userId}`);
    return res.status(StatusCodes.OK).json(retTrireas);
};