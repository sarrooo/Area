import { Request, Response } from "express";
import Logging from "~/lib/logging";
import {
  ForbiddenRequestException,
  UnauthorizedRequestException,
} from "~/utils/exceptions";
import { prisma } from "~/lib/prisma";
import { verify } from "jsonwebtoken";

export const linkTokenConnectHandler = async (
  req: Request,
  res: Response,
) => {
  let payload: any;
  try {
    payload = verify(req.body.token, process.env.JWT_SECRET as string);
  } catch (error) {
    Logging.error(error);
    throw new UnauthorizedRequestException("Invalid token");
  }
  if (!payload) {
    throw new ForbiddenRequestException("Invalid refresh token");
  }
  if (!req.user.id) {
    throw new ForbiddenRequestException("Invalid user id");
  }

  await prisma.userService.upsert({
    where: {
      userId_serviceId: {
        userId: req.user.id,
        serviceId: payload.serviceId,
      },
    },
    update: {
      RefreshToken: payload.access_token,
    },
    create: {
      userId: req.user.id,
      serviceId: payload.serviceId,
      RefreshToken: payload.access_token,
    },
  });

  res.status(201).json({message: "Service linked", user: req.user, serviceId: payload.serviceId, token: payload.access_token});
};
