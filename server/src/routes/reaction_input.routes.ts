import {Request, Response, Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {BadRequestException} from "~/utils/exceptions";
import {prisma} from "~/lib/prisma";
import { ReactionInput, Output, searchMax } from '~/types/api';
import Logging from '~/lib/logging';
import dotenv from 'dotenv';
import {validate} from "~/middlewares/validate";
import { createReactionInputTypeSchema } from '~/schemas/reaction_input.schema';

dotenv.config();

const reactionInputRoutes = Router();

// Create Reaction Input Type : POST /input/reaction
reactionInputRoutes.post('/'/*, verifyToken, */, validate(createReactionInputTypeSchema), async (req: Request, res: Response) => {
    const {id, reactionId, name, description, regex, mandatory, type}: ReactionInput = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    if (id !== undefined)
        throw new BadRequestException("You cannot specify an id when creating a trigger output type");
    const newReactionInputType = await prisma.reactionInput.create({
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

export default reactionInputRoutes;