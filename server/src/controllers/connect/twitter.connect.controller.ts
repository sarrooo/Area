import { NextFunction, Request, Response } from "express";
import Logging from "~/lib/logging";
import {
  BadRequestException,
} from "~/utils/exceptions";
import { prisma } from "~/lib/prisma";
import { sign } from "jsonwebtoken";
import { getTwitterConnectOauthToken } from "~~/services/twitter-session.service";

export const twitterConnectHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const platform = (req.query.platform as string) || "web";

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

  const token = sign(
    {
      serviceId: twitter.id,
      access_token,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: `90s` }
  );

  if (platform === "mobile") {
    res.redirect(`mobile://com.mobile/CallbackSubscribe/${token}`);
  } else {
    res.redirect(`${process.env.CORS_FRONT_URL}/oauth_callback_subscribe?access_token=${token}`);
  }
};
