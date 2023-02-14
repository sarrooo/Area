import {Router} from 'express';
import {validate} from "~/middlewares/validate";
import { createReactionInputTypeSchema, deleteReactionInputTypeSchema, readReactionInputTypeSchema, searchReactionInputTypeSchema, updateReactionInputTypeSchema } from '~/schemas/reaction_input.schema';
import { verifyToken } from '~/middlewares/auth.handler';
import { createReactionInput, deleteReactionInput, readReactionInput, searchReactionInput, updateReactionInput } from '~/controllers/reaction_input.controller';

const reactionInputRoutes = Router();

// Create Reaction Input Type : POST /input/reaction
reactionInputRoutes.post('/', verifyToken, validate(createReactionInputTypeSchema), createReactionInput);
// Read Reaction Input Type : GET /input/reaction/:id
reactionInputRoutes.get('/:id', validate(readReactionInputTypeSchema), readReactionInput);
// Update Trigger Input Type : POST /input/trigger/:id
reactionInputRoutes.post('/:id', verifyToken, validate(updateReactionInputTypeSchema), updateReactionInput);
// Delete Reaction Input Type : POST /input/reaction/delete/:id
reactionInputRoutes.post('/delete/:id', verifyToken, validate(deleteReactionInputTypeSchema), deleteReactionInput);
// Search Reaction Input Type : GET /input/reaction
reactionInputRoutes.get('/', validate(searchReactionInputTypeSchema), searchReactionInput);

export default reactionInputRoutes;