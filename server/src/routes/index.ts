import { Router } from 'express'
import authRoutes from "~/routes/auth.routes";

const routes = Router();

routes.use('/auth', authRoutes);

export default routes;