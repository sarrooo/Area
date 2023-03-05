import { NextFunction, Request, Response } from "express";
import Logging from "~/lib/logging";
import {
  BadRequestException,
  ForbiddenRequestException,
  UnauthorizedRequestException,
} from "~/utils/exceptions";
import { prisma } from "~/lib/prisma";
import { verify } from "jsonwebtoken";
import { getTwitterConnectOauthToken } from "~~/services/twitter-session.service";

export const twitterConnectHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const platform = (req.query.platform as string) || "web";
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

  const code = req.query.code as string;

  if (!code) {
    Logging.error("Twitter Connect OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }

  const { access_token } = await getTwitterConnectOauthToken({ code });
  if (!access_token) {
    Logging.error("Twitter Connect OAuth: getTwitterConnectOauthToken failed");
    throw new BadRequestException("No access_token provided");
  }

  const twitter = await prisma.service.findUnique({
    where: {
      name: "twitter",
    },
  });
  if (!twitter) {
    Logging.error("Twitter Connect OAuth: No twitter service found");
    throw new BadRequestException("No twitter service found");
  }

  await prisma.userService.upsert({
    where: {
      userId_serviceId: {
        userId: payload.id,
        serviceId: twitter.id,
      },
    },
    update: {
      RefreshToken: access_token,
    },
    create: {
      userId: payload.id,
      serviceId: twitter.id,
      RefreshToken: access_token,
    },
  });

  if (platform === "mobile") {
    res.redirect(`mobile://com.mobile/Callback/${token}`);
  } else {
    res.redirect(
      `${process.env.CORS_FRONT_URL}/oauth_callback?access_token=${token}`
    );
  }
};
