import { Router } from 'express'
import authRoutes from "~/routes/auth.routes";
import userRoutes from "~/routes/user.routes";
import triggerOutputRoutes from "~/routes/trigger_output.routes";

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/output/trigger', triggerOutputRoutes);

export default routes;