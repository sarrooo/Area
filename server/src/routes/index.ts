import { Router } from 'express'
import authRoutes from "~/routes/auth.routes";
import userRoutes from "~/routes/user.routes";
import sessionRoutes from "~/routes/session.routes";

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/sessions', sessionRoutes);

export default routes;