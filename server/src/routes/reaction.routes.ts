import { Reaction } from '@prisma/client';
import dotenv from 'dotenv';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logging from '~/lib/logging';
import { prisma } from '~/lib/prisma';
import { validate } from '~/middlewares/validate';
import { createReactionSchema, deleteReactionSchema, readReactionSchema, searchReactionSchema, updateReactionSchema } from '~/schemas/reaction.schema';
import { BadRequestException } from '~/utils/exceptions';
import { Reaction as ApiReaction, ReactionInputType as ApiReactionInputType, searchMax } from '~/types/api';
import { verifyToken } from '~/middlewares/auth.handler';
import { createReaction, deleteReaction, readReaction, searchReaction, updateReaction } from '~/controllers/reaction.controller';

dotenv.config();

const reactionRoutes = Router();

// Create Reaction : POST /reaction
reactionRoutes.post('/', verifyToken, validate(createReactionSchema), createReaction);
// Read Service : GET /reaction/:id
reactionRoutes.get('/:id', validate(readReactionSchema), readReaction);
// Update Reaction : POST /reaction/:id
reactionRoutes.post('/:id', verifyToken, validate(updateReactionSchema), updateReaction);
// Delete Reaction : POST /reaction/delete/:id
reactionRoutes.post('/delete/:id', verifyToken, validate(deleteReactionSchema), deleteReaction);
// Search Reaction : GET /reaction
reactionRoutes.get('/', validate(searchReactionSchema),searchReaction);

export default reactionRoutes;