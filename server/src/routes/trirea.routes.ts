import dotenv from 'dotenv';
import { Router } from 'express';
import { validate } from '~/middlewares/validate';
import { createTrireaSchema, readTrireaSchema, updateTrireaSchema, deleteTrireaSchema, searchTrireaSchema } from '~/schemas/trirea.schema';
import { verifyToken } from '~/middlewares/auth.handler';
import { createTrirea, deleteTrirea, readTrirea, searchTrirea, updateTrirea } from '~/controllers/trirea.controller';
dotenv.config();

const trireaRoutes = Router();

// Create Trirea : POST /trirea
trireaRoutes.post('/', verifyToken, validate(createTrireaSchema), createTrirea);
// Read Trirea : GET /trirea/:id
trireaRoutes.get('/:id', verifyToken, validate(readTrireaSchema), readTrirea);
// Update Trirea : POST /trirea/:id
trireaRoutes.post('/:id', verifyToken, validate(updateTrireaSchema), updateTrirea);
// Delete Trirea : POST /trirea/delete/:id
trireaRoutes.post('/delete/:id', verifyToken, validate(deleteTrireaSchema), deleteTrirea);
// Search Trirea : GET /trirea
trireaRoutes.get('/', verifyToken, validate(searchTrireaSchema), searchTrirea);

export default trireaRoutes;
