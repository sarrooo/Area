import { NextFunction, Request, Response } from "express";
import {
  ForbiddenRequestException,
  UnauthorizedRequestException,
} from "~/utils/exceptions";
import dotenv from "dotenv";
import { verify } from "jsonwebtoken";
import * as process from "process";
import { prisma } from "~/lib/prisma";
import * as console from "console";
import { User } from "@prisma/client";

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
  try {
    const token = (authorization && authorization.split(" ")[1]) || "";

    let payload: any = "";
    try {
      payload = verify(token, process.env.JWT_SECRET as string);
    } catch (e) {
      throw new UnauthorizedRequestException("jwt expired");
    }
    if (!payload) {
      throw new ForbiddenRequestException("Access denied (payload)");
    }
    const user = await prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      throw new ForbiddenRequestException("Access denied (user)");
    }

    const { password, ...UserWithoutPassword } = user;
    req.user = UserWithoutPassword;
  } catch (_) {
    throw new UnauthorizedRequestException("Access denied clown");
  }
  next();
};

export const isConnected: (req: Request) => Promise<User | null> = async (
  req: Request
) => {
  const { authorization } = req.headers;
  let payload: any = "";

  if (!authorization) return null;
  const token = (authorization && authorization.split(" ")[1]) || "";
  console.log(token);
  try {
    payload = verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    throw new UnauthorizedRequestException("jwt unverified");
  }
  if (!payload) return null;

  const user: User | null = await prisma.user.findFirst({
    where: {
      id: payload.id,
    },
  });
  return user;
};
