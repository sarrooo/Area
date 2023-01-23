import { Service } from '@prisma/client';
import dotenv from 'dotenv';
import {Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import Logging from '~/lib/logging';
import { prisma } from '~/lib/prisma';
import { BadRequestException } from '~/utils/exceptions';

dotenv.config();

const serviceRoutes = Router();

// Create Service : POST /service
serviceRoutes.post('/'/*, verifyToken, */, async (req, res) => {
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

export default serviceRoutes;