import dotenv from 'dotenv';
import { ReactionInputType } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Logging from "~/lib/logging";
import { prisma } from "~/lib/prisma";
import { BadRequestException } from "~/utils/exceptions";
import { searchMax } from '~/types/api';

dotenv.config();

// Create Reaction Input Type : POST /input/reaction
export const createReactionInput = async (req: Request, res: Response) => {
    const {id, name, type, description, regex, mandatory, reactionId}: ReactionInputType = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    if (id !== undefined)
        throw new BadRequestException("You cannot specify an id when creating a trigger output type");
    const newReactionInputType: ReactionInputType = await prisma.reactionInputType.create({
        data: {
            name: name,
            description: description,
            regex: regex,
            mandatory: mandatory,
            type: type,
            reactionId: reactionId
        }
    });
    Logging.info(`Reaction Input Type ${newReactionInputType.id} created`);
    return res.status(StatusCodes.CREATED).json(newReactionInputType);
};

// Read Reaction Input Type : GET /input/reaction/:id
export const readReactionInput = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const reactionInputType: ReactionInputType | null = await prisma.reactionInputType.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        Logging.info(`Reaction Input Type ${id} read`);
        return res.status(StatusCodes.OK).json(reactionInputType);
    } catch (_) {
        throw new BadRequestException("Reaction Output Type not found")
    }
};

// Update Trigger Input Type : POST /input/trigger/:id
export const updateReactionInput = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, type, description, regex, mandatory, reactionId}: ReactionInputType = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    try {
        const reactionInputType: ReactionInputType = await prisma.reactionInputType.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name,
                description: description,
                regex: regex,
                mandatory: mandatory,
                type: type,
                reactionId: reactionId
            }
        });
        Logging.info(`Reaction Input Type ${id} updated`);
        return res.status(StatusCodes.OK).json(reactionInputType);
    } catch (_) {
        throw new BadRequestException("Reaction Input Type not found")
    }
};

// Delete Reaction Input Type : POST /input/reaction/delete/:id
export const deleteReactionInput = async (req: Request, res: Response) => {
    const {id} = req.params;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    try {
        const reactionInputType: ReactionInputType = await prisma.reactionInputType.delete({
            where: {
                id: parseInt(id)
            }
        });
        Logging.info(`Reaction Input Type ${id} deleted`);
        return res.status(StatusCodes.OK).json(reactionInputType);
    } catch (_) {
        throw new BadRequestException("Reaction Input Type not found")
    }
};

// Search Reaction Input Type : GET /input/reaction
export const searchReactionInput = async (req: Request, res: Response) => {
    const {max}: searchMax = req.query;
    const reactionInputTypes: ReactionInputType[] = await prisma.reactionInputType.findMany({
        take: max
    });
    Logging.info(`Reaction Input Type searched`);
    return res.status(StatusCodes.OK).json(reactionInputTypes);
};