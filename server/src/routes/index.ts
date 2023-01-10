import { Router } from 'express'
import authRoutes from "~/routes/auth.routes";
import userRoutes from "~/routes/user.routes";

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);

export default routes;