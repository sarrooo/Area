import dotenv from 'dotenv';
import {Router} from 'express';
import {validate} from "~/middlewares/validate";
import { createTriggerInputTypeSchema, deleteTriggerInputTypeSchema, readTriggerInputTypeSchema, searchTriggerInputTypeSchema, updateTriggerInputTypeSchema } from '~/schemas/trigger_input.schema';
import { verifyToken } from '~/middlewares/auth.handler';
import { createTriggerInputType, deleteTriggerInputType, readTriggerInputType, updateTriggerInputType } from '~/controllers/trigger_input.controller';

dotenv.config();

const triggerInputRoutes = Router();

// Create Trigger Input Type : POST /input/trigger
triggerInputRoutes.post('/', verifyToken, validate(createTriggerInputTypeSchema), createTriggerInputType);
// Read Trigger Input Type : GET /input/trigger/:id
triggerInputRoutes.get('/:id', validate(readTriggerInputTypeSchema), readTriggerInputType);
// Update Trigger Input Type : POST /input/trigger/:id
triggerInputRoutes.post('/:id', verifyToken, validate(updateTriggerInputTypeSchema), updateTriggerInputType);
// Delete Trigger Input Type : POST /input/trigger/delete/:id
triggerInputRoutes.post('/delete/:id', verifyToken, validate(deleteTriggerInputTypeSchema), deleteTriggerInputType);
// Search Trigger Input Type : GET /input/trigger
triggerInputRoutes.get('/', validate(searchTriggerInputTypeSchema), deleteTriggerInputType);

export default triggerInputRoutes;