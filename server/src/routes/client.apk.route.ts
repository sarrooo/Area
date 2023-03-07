import {Router} from "express";
import { getFile } from "~/controllers/client.apk.controller";

const clientApkRoutes = Router();

clientApkRoutes.get('/', getFile);

export default clientApkRoutes;