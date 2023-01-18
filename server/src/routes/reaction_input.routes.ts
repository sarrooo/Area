import {Request, Response, Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {BadRequestException} from "~/utils/exceptions";
import {prisma} from "~/lib/prisma";
import Logging from '~/lib/logging';
import dotenv from 'dotenv';
import {validate} from "~/middlewares/validate";
import { createReactionInputTypeSchema, readReactionInputTypeSchema, updateReactionInputTypeSchema } from '~/schemas/reaction_input.schema';
import { ReactionInputType, TrireaReactionInput } from '@prisma/client';

dotenv.config();

const reactionInputRoutes = Router();

// Create Reaction Input Type : POST /input/reaction
reactionInputRoutes.post('/'/*, verifyToken, */, validate(createReactionInputTypeSchema), async (req: Request, res: Response) => {
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
});

// Read Reaction Input Type : GET /input/reaction/:id
reactionInputRoutes.get('/:id', validate(readReactionInputTypeSchema), async (req: Request, res: Response) => {
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
});

// Update Trigger Input Type : POST /input/trigger/:id
reactionInputRoutes.post('/:id'/*, verifyToken */, validate(updateReactionInputTypeSchema), async (req: Request, res: Response) => {
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
});

// Delete Reaction Input Type : POST /input/reaction/delete/:id
reactionInputRoutes.post('/delete/:id'/*, verifyToken */, async (req: Request, res: Response) => {
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
});

export default reactionInputRoutes;