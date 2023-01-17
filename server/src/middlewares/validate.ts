import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { BadRequestException } from '~/utils/exceptions';

export const validate =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse({
                    params: req.params,
                    query: req.query,
                    body: req.body,
                });

                next();
            } catch(error: any) {
                if (error instanceof ZodError) {
                    throw new BadRequestException(error.errors);
                }

                next(error);
            }
        };