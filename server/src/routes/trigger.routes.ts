import dotenv from 'dotenv';
import { Router } from 'express';
import { validate } from '~/middlewares/validate';
import { createTriggerSchema, deleteTriggerSchema, readTriggerSchema, searchTriggerSchema, updateTriggerSchema } from '~/schemas/trigger.schema';
import { verifyToken } from '~/middlewares/auth.handler';
import { createTrigger, deleteTrigger, readTrigger, searchTriggers, updateTrigger } from '~/controllers/trigger.controller';

dotenv.config();

const triggerRoutes = Router();

// Create Trigger : POST /trigger
triggerRoutes.post('/', verifyToken, validate(createTriggerSchema), createTrigger);
// Read Service : GET /service/:id
triggerRoutes.get('/:id', validate(readTriggerSchema), readTrigger);
// Update Trigger : POST /trigger/:id
triggerRoutes.post('/:id', verifyToken, validate(updateTriggerSchema), updateTrigger);
// Delete Trigger : POST /trigger/delete/:id
triggerRoutes.post('/delete/:id', verifyToken, validate(deleteTriggerSchema), deleteTrigger);
// Search Triggers : GET /trigger
triggerRoutes.get('/', validate(searchTriggerSchema), searchTriggers);

export default triggerRoutes; 