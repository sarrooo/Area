import { Router } from 'express'

import authRoutes from '~/routes/auth';
import userRoutes from "~/routes/user";
import trireaRoutes from "~/routes/trirea";

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/trirea', trireaRoutes);

export default routes;