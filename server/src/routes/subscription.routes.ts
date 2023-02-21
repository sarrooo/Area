import dotenv from 'dotenv';
import { Router } from 'express';
import { setSubscribed } from '~/controllers/subscription.controller';
import { verifyToken } from '~/middlewares/auth.handler';
import { setSubscribedSchema } from '~/schemas/subscription.schema';

dotenv.config();

const subscriptionRoutes = Router();

// Set subscribed : POST /subscription
subscriptionRoutes.post('/', verifyToken, setSubscribedSchema, setSubscribed);

export default subscriptionRoutes;