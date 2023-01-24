import { NextFunction, Request, Response } from "express";
import Logging from "~/lib/logging";
import { BadRequestException } from "~/utils/exceptions";
import {
  getTwitterOauthToken,
  getTwitterUser,
} from "~~/services/twitter-session.service";
import { prisma } from "~/lib/prisma";
import config from "config";
import { generateToken } from "~/controllers/auth/auth.controller";

export const twitterOAuthHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = req.query.code as string;
  const pathUrl = (req.query.state as string) || "/";

  if (!code) {
    Logging.warning("Twitter OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }

  const { access_token } = await getTwitterOauthToken({ code });

  if (!access_token) {
    Logging.error("Twitter OAuth: getTwitterhubOauthToken failed");
    throw new BadRequestException("No access_token provided");
  }

  const { id, name } = await getTwitterUser(access_token);

  const names: string[] = name.split(" ", 2);
  const first_name: string = names[0];
  const last_name: string = names[1] || "";

  const user = await prisma.user.upsert({
    where: {
      twitter_id: id,
    },
    update: {
      first_name: first_name,
      last_name: last_name,
      provider: "twitter",
      twitter_id: id,
    },
    create: {
      first_name: first_name,
      last_name: last_name,
      provider: "twitter",
      twitter_id: id,
    },
  });

  const token = await generateToken(user, res);
  Logging.info(`User ${user.first_name} logged in w/ Twitter`);
  Logging.info(`Redirecting to ${pathUrl}`);
  res.redirect(
    `${process.env.CORS_FRONT_URL}/oauth_callback?access_token=${token}`
  );
};
