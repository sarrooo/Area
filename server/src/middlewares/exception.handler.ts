import { NextFunction, Request, Response } from 'express';
import {StatusCodes} from "http-status-codes";
import Logging from "~/lib/logging";

export const ExceptionsHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err.status && err.error) {
        return res
            .status(err.status)
            .json({ error: err.error })
    }

    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal error' })
}
