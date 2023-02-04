import {Request, Response} from "express";
import {prisma} from "~/lib/prisma";
import {Client, Server} from "~/types/about";
import {StatusCodes} from "http-status-codes";

export const about = async (req: Request, res: Response) => {

    const services = await prisma.service.findMany({
        select: {
            name: true,
            triggers: {
                select: {
                    name: true,
                    description: true,
                }
            },
            reactions: {
                select: {
                    name: true,
                    description: true,
                }
            },
        },
    })

    const client: Client = {
        host: req.ip
    }
    const server: Server = {
        current_time: Date.now(),
        services: services,
    }

    return res.status(StatusCodes.OK).json({ client, server });
}