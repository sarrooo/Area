import { Router } from 'express'
import authRoutes from "~/routes/auth.routes";
import userRoutes from "~/routes/user.routes";
import triggerOutputRoutes from "~/routes/trigger_output.routes";
import triggerInputRoutes from './trigger_input.routes';
import reactionInputRoutes from './reaction_input.routes';
import sessionRoutes from "~/routes/session.routes";

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/output/trigger', triggerOutputRoutes);
routes.use('/input/trigger', triggerInputRoutes);
routes.use('/input/reaction', reactionInputRoutes);
routes.use('/sessions', sessionRoutes);

export default routes;