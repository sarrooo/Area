import {Request, Response, Router} from "express";
import {Server, Client} from "~/types/about";
import {prisma} from "~/lib/prisma";
import {StatusCodes} from "http-status-codes";

const aboutRoutes = Router();

aboutRoutes.get('/about.json', async (req: Request, res: Response) => {

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

    let client: Client = {
            host: req.ip
    }
    let server: Server = {
        current_time: Date.now(),
        services: services,
    }

    return res.status(StatusCodes.OK).json({ client, server });
});

export default aboutRoutes;