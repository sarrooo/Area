import { NextFunction, Request, Response } from "express";
import {
  ForbiddenRequestException,
  UnauthorizedRequestException,
} from "~/utils/exceptions";
import dotenv from "dotenv";
import { verify } from "jsonwebtoken";
import * as process from "process";
import { prisma } from "~/lib/prisma";
import Logging from "~/lib/logging";

dotenv.config();

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new ForbiddenRequestException("No token provided");
  }
  const token = (authorization && authorization.split(" ")[1]) || "";
  let payload: any = "";
  try {
    payload = verify(token, process.env.JWT_SECRET as string);
    if (!payload) {
      throw new ForbiddenRequestException("Access denied");
    }
  } catch (e) {
    Logging.error(e);
    throw new UnauthorizedRequestException("jwt expired");
  }
  const user = await prisma.user.findFirst({
    where: {
      id: payload.id,
    },
  });
  if (!user) {
    throw new ForbiddenRequestException("Access denied");
  }
  const { password, ...UserWithoutPassword } = user;
  req.user = UserWithoutPassword;
  next();
};
