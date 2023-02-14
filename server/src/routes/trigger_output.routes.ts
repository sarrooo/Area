import {Router} from 'express';
import dotenv from 'dotenv';
import {validate} from "~/middlewares/validate";
import { deleteTriggerOutputTypeSchema, readTriggerOutputTypeSchema, searchTriggerOutputTypeSchema, updateTriggerOutputTypeSchema } from '~/schemas/trigger_output.schema';
import { verifyToken } from '~/middlewares/auth.handler';
import { createTriggerOutputType, deleteTriggerOutputType, readTriggerOutputType, searchTriggerOutputType, updateTriggerOutputType } from '~/controllers/trigger_output.controller';

dotenv.config();

const triggerOutputRoutes = Router();

// Create Trigger Output Type : POST /output/trigger
triggerOutputRoutes.post('/', verifyToken, createTriggerOutputType);
// Read Trigger Output Type : GET /output/trigger/:id
triggerOutputRoutes.get('/:id', validate(readTriggerOutputTypeSchema), readTriggerOutputType);
// Update Trigger Output Type : POST /output/trigger/:id
triggerOutputRoutes.post('/:id', verifyToken, validate(updateTriggerOutputTypeSchema), updateTriggerOutputType);
// Delete Trigger Output Type : POST /output/trigger/delete/:id
triggerOutputRoutes.post('/delete/:id', verifyToken, validate(deleteTriggerOutputTypeSchema), deleteTriggerOutputType);
// Search Trigger Output Type : GET /output/trigger
triggerOutputRoutes.get('/', validate(searchTriggerOutputTypeSchema), searchTriggerOutputType);

export default triggerOutputRoutes;