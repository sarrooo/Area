import { Request, Response } from "express";
import Logging from "~/lib/logging";
import { BadRequestException } from "~/utils/exceptions";
import {
  getTwitterOauthToken,
  getTwitterUser,
} from "~~/services/twitter-session.service";
import { prisma } from "~/lib/prisma";
import { generateToken } from "~/controllers/auth/auth.controller";
import { getRedirectUri } from "../../utils/req";

export const twitterOAuthHandler = async (
  req: Request,
  res: Response,
) => {
  const code = req.query.code as string;
  const platform = (req.query.platform as string) || "web";

  if (!code) {
    Logging.warning("Twitter OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }

  const { access_token } = await getTwitterOauthToken({ code, redirect_uri: getRedirectUri() });

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

  await prisma.userService.upsert({
    where: {
      userId_serviceId: {
        userId: user.id,
        serviceId: 2,
      },
    },
    update: {
      userId: user.id,
      serviceId: 2,
      RefreshToken: access_token,
    },
    create: {
      userId: user.id,
      serviceId: 2,
      RefreshToken: access_token,
    }
  });

  const token = await generateToken(user, res);
  Logging.info(`User ${user.first_name} logged in w/ Twitter`);
  Logging.info(`Redirecting`);
  
  if (platform === "mobile") {
    res.redirect(
      `mobile://com.mobile/CallbackLogin/${token}`
    );
  } else {
    res.redirect(
      `${process.env.CORS_FRONT_URL}/oauth_callback?access_token=${token}`
    );
  }
};
