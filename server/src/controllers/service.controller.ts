import {
  Reaction,
  ReactionInputType,
  Service,
  Trigger,
  TriggerInputType,
  TriggerOutputType,
  User,
  UserService,
} from "@prisma/client";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Logging from "~/lib/logging";
import { prisma } from "~/lib/prisma";
import {
  searchMax,
  Service as ApiService,
  Trigger as ApiTrigger,
  TriggerInputType as ApiTriggerInputType,
  TriggerOutputType as ApiTriggerOutputType,
  Reaction as ApiReaction,
  ReactionInputType as ApiReactionInputType,
} from "~/types/api";
import { BadRequestException } from "~/utils/exceptions";

dotenv.config();

// Create Service : POST /service
export const createService = async (req: Request, res: Response) => {
  const { id, name, description, image, requiredSubscription }: Service =
    req.body;
  // TODO Check if user is admin
  /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
  if (id !== undefined)
    throw new BadRequestException(
      "You cannot specify an id when creating a service"
    );
  const newService: Service = await prisma.service.create({
    data: {
      name: name,
      description: description,
      image: image,
      requiredSubscription: requiredSubscription,
    },
  });
  Logging.info(`Service ${newService.id} created`);
  return res.status(StatusCodes.CREATED).json(newService);
};

async function buildService(
  service: Service,
  req: Request
): Promise<ApiService> {
  const retService: ApiService = {
    id: service.id,
    name: service.name,
    description: service.description === null ? undefined : service.description,
    image: service.image === null ? undefined : service.image,
    requiredSubscription: service.requiredSubscription,
    subscribed: undefined,
  };
  const user = req.user;
  if (user !== null && user !== undefined) {
    // Check if user is subscribed to service
    const userService: UserService | null = await prisma.userService.findUnique(
      {
        where: {
          userId_serviceId: {
            userId: user.id ? user.id : -1,
            serviceId: service.id,
          },
        },
      }
    );
    retService.subscribed = userService === null ? false : true;
  }
  // Add triggers objects in service
  const serviceTriggers: Trigger[] = await prisma.trigger.findMany({
    where: {
      serviceId: service.id,
    },
  });
  for (let i = 0; i < serviceTriggers.length; i++) {
    const trigger: Trigger = serviceTriggers[i];
    const addTrigger: ApiTrigger = {
      id: trigger.id,
      name: trigger.name,
      description:
        trigger.description === null ? undefined : trigger.description,
      serviceId: trigger.serviceId,
    };
    // Add trigger input type
    const triggerInputTypes: TriggerInputType[] =
      await prisma.triggerInputType.findMany({
        where: {
          triggerId: trigger.id,
        },
      });
    for (let j = 0; j < triggerInputTypes.length; j++) {
      const triggerInputType: TriggerInputType = triggerInputTypes[j];
      const addInputType: ApiTriggerInputType = {
        id: triggerInputType.id,
        name: triggerInputType.name,
        type: triggerInputType.type,
        description:
          triggerInputType.description === null
            ? undefined
            : triggerInputType.description,
        regex:
          triggerInputType.regex === null ? undefined : triggerInputType.regex,
        mandatory: triggerInputType.mandatory,
        triggerId: triggerInputType.triggerId,
      };
      if (addTrigger.inputs === undefined) addTrigger.inputs = [];
      addTrigger.inputs.push(addInputType);
    }
    // Add trigger output type to trigger
    const triggerOutputTypes: TriggerOutputType[] =
      await prisma.triggerOutputType.findMany({
        where: {
          triggerId: trigger.id,
        },
      });
    for (let j = 0; j < triggerOutputTypes.length; j++) {
      const triggerOutputType: TriggerOutputType = triggerOutputTypes[j];
      const addOutputType: ApiTriggerOutputType = {
        id: triggerOutputType.id,
        name: triggerOutputType.name,
        type: triggerOutputType.type,
        description:
          triggerOutputType.description === null
            ? undefined
            : triggerOutputType.description,
        triggerId: triggerOutputType.triggerId,
      };
      if (addTrigger.outputs === undefined) addTrigger.outputs = [];
      addTrigger.outputs.push(addOutputType);
    }
    // Finally add trigger to service
    if (retService.triggers === undefined) retService.triggers = [];
    retService.triggers.push(addTrigger);
  }
  // Add reactions objects in service
  const serviceReactions: Reaction[] = await prisma.reaction.findMany({
    where: {
      serviceId: service.id,
    },
  });
  for (let i = 0; i < serviceReactions.length; i++) {
    const reaction: Reaction = serviceReactions[i];
    const addReaction: ApiReaction = {
      id: reaction.id,
      name: reaction.name,
      description:
        reaction.description === null ? undefined : reaction.description,
      serviceId: reaction.serviceId,
    };
    // Add reaction input type
    const reactionInputTypes: ReactionInputType[] =
      await prisma.reactionInputType.findMany({
        where: {
          reactionId: reaction.id,
        },
      });
    for (let j = 0; j < reactionInputTypes.length; j++) {
      const reactionInputType: ReactionInputType = reactionInputTypes[j];
      const addInputType: ApiReactionInputType = {
        id: reactionInputType.id,
        name: reactionInputType.name,
        type: reactionInputType.type,
        description:
          reactionInputType.description === null
            ? undefined
            : reactionInputType.description,
        regex:
          reactionInputType.regex === null
            ? undefined
            : reactionInputType.regex,
        mandatory: reactionInputType.mandatory,
        reactionId: reactionInputType.reactionId,
      };
      if (addReaction.inputs === undefined) addReaction.inputs = [];
      addReaction.inputs.push(addInputType);
    }
  }
  return retService;
}

// Read Service : GET /service/:id
export const readService = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("THIS IS MY ID : ", id);
  try {
    const service: Service | null = await prisma.service.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (service === null) throw new BadRequestException("Service not found");
    const retService: ApiService = await buildService(service, req);
    Logging.info(`Service ${id} read`);
    return res.status(StatusCodes.OK).json(retService);
  } catch (_) {
    throw new BadRequestException("Service not found");
  }
};

// Update Service : POST /service/:id
export const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, image, requiredSubscription }: Service = req.body;
  // TODO Check if user is admin
  /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
  try {
    const service: Service = await prisma.service.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        description: description,
        image: image,
        requiredSubscription: requiredSubscription,
      },
    });
    Logging.info(`Service ${id} updated`);
    return res.status(StatusCodes.OK).json(service);
  } catch (_) {
    throw new BadRequestException("Service not found");
  }
};

// Delete Service : POST /service/delete/:id
export const deleteService = async (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO Check if user is admin
  /*if (!is_Admin(id))
        throw new ForbiddenRequestException("You are not allowed to create a trigger output type");*/
  try {
    const service: Service = await prisma.service.delete({
      where: {
        id: parseInt(id),
      },
    });
    Logging.info(`Service ${id} deleted`);
    return res.status(StatusCodes.OK).json(service);
  } catch (_) {
    throw new BadRequestException("Service not found");
  }
};

// Search Service : GET /service
export const searchService = async (req: Request, res: Response) => {
  const { max }: searchMax = req.query;
  const services: Service[] = await prisma.service.findMany({
    take: max,
  });
  const retServices: ApiService[] = [];
  for (let i = 0; i < services.length; i++) {
    const retService: ApiService = await buildService(services[i], req);
    retServices.push(retService);
  }
  Logging.info(`Services searched`);
  return res.status(StatusCodes.OK).json(retServices);
};
