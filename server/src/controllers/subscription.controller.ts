import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '~/lib/prisma';
import { BadRequestException } from '~/utils/exceptions';

dotenv.config();

// Set subscribed : POST /subscription
export const setSubscribed = async (req: Request, res: Response) => {
    const {serviceId, subscribed} = req.body;
    const userId: number = req.user.id as number;
    try {
        if (subscribed) {
            await prisma.userService.create({
                data: {
                    userId: userId,
                    serviceId: serviceId,
                }
            });
        } else {
            await prisma.userService.delete({
                where: {
                    userId_serviceId: {
                        userId: userId,
                        serviceId: serviceId,
                    }
                }
            });
        }
    } catch (_) {
        throw new BadRequestException("Error while setting subscription")
    }
    return res.status(StatusCodes.OK).json({message: "Subscription updated"});
};