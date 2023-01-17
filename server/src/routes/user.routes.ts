import dotenv from "dotenv";
import {Request, Response, Router} from "express";
import {verifyToken} from "~/middlewares/auth.handler";
import {StatusCodes} from "http-status-codes";

dotenv.config();

const userRouter = Router();

userRouter.get('/me', verifyToken, async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).json({ user: req.user });
});

export default userRouter;