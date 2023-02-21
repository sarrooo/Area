import { Request, Response } from "express";
import { prisma } from "~/lib/prisma";
import { sign, verify } from "jsonwebtoken";
import { User } from "@prisma/client";
import config from "config";
import { LoginUserInput, RegisterUserInput } from "~/schemas/user.schema";
import {
  BadRequestException,
  ForbiddenRequestException,
  UnauthorizedRequestException,
} from "~/utils/exceptions";
import { compare, hash } from "bcrypt";
import Logging from "~/lib/logging";
import { StatusCodes } from "http-status-codes";

export const login = async (req: Request, res: Response) => {
  const { email, password }: LoginUserInput = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new BadRequestException("Invalid email or password");
  }

  if (user.password === null) {
    throw new BadRequestException("Password should be set");
  }
  const verifyPassword = await compare(password, user.password);
  if (!verifyPassword) {
    throw new BadRequestException("Invalid email or password");
  }

  // Set maxAge at 7days.
  // secure should be set to true in production, but it would work only in HTTPS
  const token = await generateToken(user, res);
  Logging.info(`User ${user.email} logged in`);
  res.status(StatusCodes.OK).json({ token });
};

export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password }: RegisterUserInput =
    req.body;

  const userAlreadyExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userAlreadyExist) {
    throw new BadRequestException("User already exists");
  }

  const hashedPassword = await hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      first_name: first_name,
      last_name: last_name,
      password: hashedPassword,
      email: email,
    },
  });
  const { id } = newUser;
  Logging.info(`User ${email} register in`);
  const token = await generateToken(newUser, res);
  return res.status(StatusCodes.CREATED).json({ token: token, id: id });
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    throw new ForbiddenRequestException("No refresh token");
  }

  let payload: any;
  try {
    payload = verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
  } catch (error) {
    Logging.error(error);
    throw new UnauthorizedRequestException("Invalid refresh token");
  }
  if (!payload) {
    throw new ForbiddenRequestException("Invalid refresh token");
  }

  const dbRefreshToken = await prisma.token.findFirst({
    where: {
      userId: payload.id,
      expiredAt: {
        gte: new Date(),
      },
    },
  });
  if (!dbRefreshToken) {
    throw new ForbiddenRequestException("Invalid refresh token");
  }

  const token = sign(
    { id: payload.id, name: payload.email },
    process.env.JWT_SECRET as string,
    { expiresIn: `${config.get<number>("jwtConfig.expiresInSecret")}s`}
  );
  return res.status(StatusCodes.OK).json({ token });
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    throw new ForbiddenRequestException("Already logout!");
  }

  await prisma.token.delete({
    where: {
      token: refreshToken,
    },
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "none",
    maxAge: 0,
    secure: true,
  });
  return res.sendStatus(StatusCodes.NO_CONTENT);
};

export const generateToken = async (
  user: User,
  res: Response
): Promise<string> => {
  const refreshToken = sign(
    { id: user.id, first_name: user.first_name, last_name: user.last_name },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN_REFRESH_SECRET }
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * config.get<number>("jwtConfig.expiresInRefreshSecret"),
    secure: true,
  });

  const expiredAt = new Date();
  expiredAt.setDate(expiredAt.getDate() + 7);
  await prisma.token.upsert({
    where: {
      userId: user.id,
    },
    update: {
      token: refreshToken,
      expiredAt: expiredAt,
    },
    create: {
      userId: user.id,
      token: refreshToken,
      expiredAt: expiredAt,
    },
  });
  Logging.info(
    `Refresh token generated for user ${
      config.get<number>("jwtConfig.expiresInSecret") * 1000
    }`
  );
  const token = sign(
    { id: user.id, first_name: user.first_name, last_name: user.last_name },
    process.env.JWT_SECRET as string,
    { expiresIn: `${config.get<number>("jwtConfig.expiresInSecret")}s` }
  );
  Logging.info(
    `Token generated for user ${config.get<number>(
      "jwtConfig.expiresInSecret"
    )}`
  );
  return token;
};
