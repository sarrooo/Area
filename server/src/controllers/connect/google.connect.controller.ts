import { Request, Response } from "express";
import Logging from "~/lib/logging";
import {
  BadRequestException,
} from "~/utils/exceptions";
import { prisma } from "~/lib/prisma";
import { sign } from "jsonwebtoken";
import { getGoogleConnectOauthToken } from "~~/services/google-session.service";
import { getRedirectUri } from "../../utils/req";

export const googleConnectHandler = async (req: Request, res: Response) => {
  const platform = (req.query.platform as string) || "web";

  const code = req.query.code as string;
  if (!code) {
    Logging.error("Google Connect OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }

  const { access_token } = await getGoogleConnectOauthToken({ code, redirect_uri: getRedirectUri(req) });
  if (!access_token) {
    Logging.error("Google Connect OAuth: getGoogleConnectOauthToken failed");
    throw new BadRequestException("No access_token provided");
  }

  const google = await prisma.service.findUnique({
    where: {
      name: "google",
    },
  });
  if (!google) {
    Logging.error("Google Connect OAuth: No google service found");
    throw new BadRequestException("No google service found");
  }

  const token = sign(
    {
      serviceId: google.id,
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


