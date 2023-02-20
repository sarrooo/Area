import { Trigger } from '@prisma/client';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logging from '~/lib/logging';
import { prisma } from '~/lib/prisma';
import { searchMax, Trigger as ApiTrigger,
    TriggerInputType as ApiTriggerInputType,
    TriggerOutputType as ApiTriggerOutputType } from '~/types/api';
import { BadRequestException } from '~/utils/exceptions';

dotenv.config();

// Create Trigger : POST /trigger
export const createTrigger = async (req: Request, res: Response) => {
    const {id, name, description, serviceId}: Trigger = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    if (id !== undefined)
        throw new BadRequestException("You cannot specify an id when creating a trigger");
    try {
        const newTrigger: Trigger = await prisma.trigger.create({
            data: {
                name: name,
                description: description,
                serviceId: serviceId
            }
        });
        Logging.info(`Trigger ${newTrigger.id} created`);
        return res.status(StatusCodes.CREATED).json(newTrigger);
    }  catch (error: any) {
        throw new BadRequestException(`Error while creating trigger: ${error.message}`);
    }
};

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

    for(const triggerInputType of triggerInputTypes) {
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
    }
    const triggerOutputTypes = await prisma.triggerOutputType.findMany({
        where: {
            triggerId: trigger.id
        }
    });

    for(const triggerOutputType of triggerOutputTypes) {
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
    }
    return retTrigger;
}

// Read Service : GET /service/:id
export const readTrigger = async (req: Request, res: Response) => {
    const {id} = req.params;
    Logging.info(`what is this -> ${id} or ${parseInt(id)}`);
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
};

// Update Trigger : POST /trigger/:id
export const updateTrigger = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, description, serviceId}: Trigger = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to update a trigger output type");*/
    try {
        const updatedTrigger: Trigger = await prisma.trigger.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name,
                description: description,
                serviceId: serviceId
            }
        });
        Logging.info(`Trigger ${id} updated`);
        return res.status(StatusCodes.OK).json(updatedTrigger);
    } catch (_) {
        throw new BadRequestException("Trigger not found")
    }
};

// Delete Trigger : POST /trigger/delete/:id
export const deleteTrigger = async (req: Request, res: Response) => {
    const {id} = req.params;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to delete a trigger output type");*/
    try {
        const deletedTrigger: Trigger = await prisma.trigger.delete({
            where: {
                id: parseInt(id)
            }
        });
        Logging.info(`Trigger ${id} deleted`);
        return res.status(StatusCodes.OK).json(deletedTrigger);
    } catch (_) {
        throw new BadRequestException("Trigger not found")
    }
};

// Search Triggers : GET /trigger
export const searchTriggers = async (req: Request, res: Response) => {
    const {max}: searchMax = req.query;
    const triggers: Trigger[] = await prisma.trigger.findMany({
        take: max
    });
    const retTriggers: ApiTrigger[] = [];
    for (const trigger of triggers) {
        retTriggers.push(await buildTrigger(trigger));
    }
    Logging.info(`Triggers searched`);
    return res.status(StatusCodes.OK).json(retTriggers);
};