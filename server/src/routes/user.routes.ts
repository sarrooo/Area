import dotenv from "dotenv";
import {Request, Response, Router} from "express";
import {verifyToken} from "~/middlewares/auth.handler";

dotenv.config();

const userRouter = Router();

userRouter.get('/me', verifyToken, async (req: Request, res: Response) => {
    return res.status(200).json({ user: req.user });
});

export default userRouter;