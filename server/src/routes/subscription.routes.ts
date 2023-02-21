import dotenv from 'dotenv';
import { Router } from 'express';
import { setSubscribed } from '~/controllers/subscription.controller';
import { verifyToken } from '~/middlewares/auth.handler';
import { setSubscribedSchema } from '~/schemas/subscription.schema';
import {validate} from "~/middlewares/validate";

dotenv.config();

const subscriptionRoutes = Router();

// Set subscribed : POST /subscription
subscriptionRoutes.post('/', verifyToken, validate(setSubscribedSchema), setSubscribed);

export default subscriptionRoutes;