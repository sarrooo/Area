import dotenv from 'dotenv';
import { validate } from '~/middlewares/validate';
import { createServiceSchema, deleteServiceSchema, readServiceSchema, searchServiceSchema, updateServiceSchema } from '~/schemas/service.schema';
import { createService, deleteService, readService, searchService, updateService } from '~/controllers/service.controller';
import { verifyToken } from '~/middlewares/auth.handler';
import { Router } from 'express';

dotenv.config();

const serviceRoutes = Router();

// Create Service : POST /service
serviceRoutes.post('/', verifyToken, validate(createServiceSchema), createService);
// Read Service : GET /service/:id
serviceRoutes.get('/:id', validate(readServiceSchema), readService);
// Update Service : POST /service/:id
serviceRoutes.post('/:id', verifyToken, validate(updateServiceSchema), updateService);
// Delete Service : POST /service/delete/:id
serviceRoutes.post('/delete/:id', verifyToken, validate(deleteServiceSchema), deleteService);
// Search Service : GET /service
serviceRoutes.get('/', validate(searchServiceSchema), searchService);

export default serviceRoutes;