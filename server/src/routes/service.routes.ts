import { Reaction, ReactionInputType, Service, Trigger, TriggerInputType, TriggerOutputType, User, UserService } from '@prisma/client';
import dotenv from 'dotenv';
import {Request, Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import Logging from '~/lib/logging';
import { prisma } from '~/lib/prisma';
import { validate } from '~/middlewares/validate';
import { createServiceSchema, deleteServiceSchema, readServiceSchema, searchServiceSchema, updateServiceSchema } from '~/schemas/service.schema';
import { BadRequestException } from '~/utils/exceptions';
import { searchMax, Service as ApiService,
    Trigger as ApiTrigger,
    TriggerInputType as ApiTriggerInputType,
    TriggerOutputType as ApiTriggerOutputType,
    Reaction as ApiReaction,
    ReactionInputType as ApiReactionInputType } from '~/types/api';
import { isConnected } from '~/middlewares/auth.handler';

dotenv.config();

const serviceRoutes = Router();

// Create Service : POST /service
serviceRoutes.post('/'/*, verifyToken, */, validate(createServiceSchema), async (req, res) => {
    const {id, name, description, image, requiredSubscription}: Service = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    if (id !== undefined)
        throw new BadRequestException("You cannot specify an id when creating a service");
    const newService: Service = await prisma.service.create({
        data: {
            name: name,
            description: description,
            image: image,
            requiredSubscription: requiredSubscription
        }
    });
    Logging.info(`Service ${newService.id} created`);
    return res.status(StatusCodes.CREATED).json(newService);
});

async function buildService(service: Service, req: Request): Promise<ApiService> {
    const retService : ApiService = {
        id: service.id,
        name: service.name,
        description: service.description === null ? undefined : service.description,
        image: service.image === null ? undefined : service.image,
        requiredSubscription: service.requiredSubscription,
        subscribed: undefined
    };
    const user: User | null = await isConnected(req);
    if (user !== null) {
        // Check if user is subscribed to service
        const userService: UserService | null = await prisma.userService.findUnique({
            where: {
                userId_serviceId: {
                    userId: user.id,
                    serviceId: service.id
                }
            }
        });
        retService.subscribed = userService === null ? false : true;
    }
    // Add triggers objects in service
    const serviceTriggers: Trigger[] = await prisma.trigger.findMany({
        where: {
            serviceId: service.id
        }
    });
    serviceTriggers.forEach(async (trigger: Trigger) => {
        const addTrigger: ApiTrigger = {
            id: trigger.id,
            name: trigger.name,
            description: trigger.description === null ? undefined : trigger.description,
            serviceId: trigger.serviceId,
        };
        // Add trigger input type
        const triggerInputTypes: TriggerInputType[] = await prisma.triggerInputType.findMany({
            where: {
                triggerId: trigger.id
            },
        });
        triggerInputTypes.forEach((triggerInputType: TriggerInputType) => {
            const addInputType: ApiTriggerInputType = {
                id: triggerInputType.id,
                name: triggerInputType.name,
                type: triggerInputType.type,
                description: triggerInputType.description === null ? undefined : triggerInputType.description,
                regex: triggerInputType.regex === null ? undefined : triggerInputType.regex,
                mandatory: triggerInputType.mandatory,
                triggerId: triggerInputType.triggerId,
            };
            if (addTrigger.inputs === undefined)
                addTrigger.inputs = [];
            addTrigger.inputs.push(addInputType);
        });
        // Add trigger output type to trigger
        const triggerOutputTypes: TriggerOutputType[] = await prisma.triggerOutputType.findMany({
            where: {
                triggerId: trigger.id
            }
        });
        triggerOutputTypes.forEach((triggerOutputType: TriggerOutputType) => {
            const addOutputType: ApiTriggerOutputType = {
                id: triggerOutputType.id,
                name: triggerOutputType.name,
                type: triggerOutputType.type,
                description: triggerOutputType.description === null ? undefined : triggerOutputType.description,
                triggerId: triggerOutputType.triggerId,
            };
            if (addTrigger.outputs === undefined)
                addTrigger.outputs = [];
            addTrigger.outputs.push(addOutputType);
        });
        // Add reactions objects in service
        const serviceReactions: Reaction[] = await prisma.reaction.findMany({
            where: {
                serviceId: service.id
            },
        });
        serviceReactions.forEach(async (reaction: Reaction) => {
            const addReaction: ApiReaction = {
                id: reaction.id,
                name: reaction.name,
                description: reaction.description === null ? undefined : reaction.description,
                serviceId: reaction.serviceId,
            };
            // Add reaction input type
            const reactionInputTypes: ReactionInputType[] = await prisma.reactionInputType.findMany({
                where: {
                    reactionId: reaction.id
                }
            });
            reactionInputTypes.forEach((reactionInputType: ReactionInputType) => {
                const addInputType: ApiReactionInputType = {
                    id: reactionInputType.id,
                    name: reactionInputType.name,
                    type: reactionInputType.type,
                    description: reactionInputType.description === null ? undefined : reactionInputType.description,
                    regex: reactionInputType.regex === null ? undefined : reactionInputType.regex,
                    mandatory: reactionInputType.mandatory,
                    reactionId: reactionInputType.reactionId,
                };
                if (addReaction.inputs === undefined)
                    addReaction.inputs = [];
                addReaction.inputs.push(addInputType);
            });
        });
        // Finally add trigger to service
        if (retService.triggers === undefined)
            retService.triggers = [];
        retService.triggers.push(addTrigger);
    });
    return retService;
}

// Read Service : GET /service/:id
serviceRoutes.get('/:id', validate(readServiceSchema), async (req, res) => {
    const {id} = req.params;
    try {
        const service: Service | null = await prisma.service.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (service === null)
            throw new BadRequestException("Service not found");
        const retService: ApiService = await buildService(service, req);
        Logging.info(`Service ${id} read`);
        return res.status(StatusCodes.OK).json(retService);
    } catch (_) {
        throw new BadRequestException("Service not found")
    }
});

// Update Service : POST /service/:id
serviceRoutes.post('/:id'/*, verifyToken, */, validate(updateServiceSchema), async (req, res) => {
    const {id} = req.params;
    const {name, description, image, requiredSubscription}: Service = req.body;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    try {
        const service: Service = await prisma.service.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name,
                description: description,
                image: image,
                requiredSubscription: requiredSubscription
            }
        });
        Logging.info(`Service ${id} updated`);
        return res.status(StatusCodes.OK).json(service);
    } catch (_) {
        throw new BadRequestException("Service not found")
    }
});

// Delete Service : POST /service/delete/:id
serviceRoutes.post('/delete/:id'/*, verifyToken, */, validate(deleteServiceSchema), async (req, res) => {
    const {id} = req.params;
    // TODO Check if user is admin
    /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
    try {
        const service: Service = await prisma.service.delete({
            where: {
                id: parseInt(id)
            }
        });
        Logging.info(`Service ${id} deleted`);
        return res.status(StatusCodes.OK).json(service);
    } catch (_) {
        throw new BadRequestException("Service not found")
    }
});

// Search Service : GET /service
serviceRoutes.get('/', validate(searchServiceSchema), async (req, res) => {
    const {max}: searchMax = req.query;
    const services: Service[] = await prisma.service.findMany({
        take: max
    });
    const retServices: ApiService[] = [];
    services.forEach(async (service: Service) => {
        retServices.push(await buildService(service, req));
    });
    Logging.info(`Services searched`);
    return res.status(StatusCodes.OK).json(retServices);
});

export default serviceRoutes;