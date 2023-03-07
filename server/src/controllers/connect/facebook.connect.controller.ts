import { NextFunction, Request, Response } from "express";
import Logging from "~/lib/logging";
import {
  BadRequestException,
} from "~/utils/exceptions";
import { prisma } from "~/lib/prisma";
import { sign } from "jsonwebtoken";
import { getFacebookOauthToken } from "~~/services/facebook-session.service";
import { getRedirectUri } from "../../utils/req";

export const facebookConnectHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const platform = (req.query.platform as string) || "web";

  const code = req.query.code as string;
  if (!code) {
    Logging.error("Facebook OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }

  const { access_token } = await getFacebookOauthToken({ code, redirect_uri: getRedirectUri(req) });
  if (!access_token) {
    Logging.error("Facebook OAuth: getFacebookOauthToken failed");
    throw new BadRequestException("No access_token provided");
  }

  const facebook = await prisma.service.findUnique({
    where: {
      name: "facebook",
    },
  });
  if (!facebook) {
    Logging.error("Facebook OAuth: No facebook service found");
    throw new BadRequestException("No facebook service found");
  }

  const token = sign(
    {
      serviceId: facebook.id,
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

