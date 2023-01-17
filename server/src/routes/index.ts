import { Router } from 'express'
import authRoutes from "~/routes/auth.routes";
import userRoutes from "~/routes/user.routes";
import triggerOutputRoutes from "~/routes/trigger_output.routes";
import triggerInputRoutes from './trigger_input.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/output/trigger', triggerOutputRoutes);
routes.use('/input/trigger', triggerInputRoutes);

export default routes;