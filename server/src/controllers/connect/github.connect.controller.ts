import { NextFunction, Request, Response } from "express";
import Logging from "~/lib/logging";
import {
  BadRequestException,
  ForbiddenRequestException,
  UnauthorizedRequestException,
} from "~/utils/exceptions";
import { prisma } from "~/lib/prisma";
import { sign, verify } from "jsonwebtoken";
import { getGithubOauthToken } from "~~/services/github-session.service";

export const githubConnectHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const platform = (req.query.platform as string) || "web";

  const code = req.query.code as string;
  if (!code) {
    Logging.error("Github Connect OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }

  const { access_token } = await getGithubOauthToken({ code });
  if (!access_token) {
    Logging.error("Github Connect OAuth: getGithubConnectOauthToken failed");
    throw new BadRequestException("No access_token provided");
  }

  const github = await prisma.service.findUnique({
    where: {
      name: "github",
    },
  });
  if (!github) {
    Logging.error("Github Connect OAuth: No github service found");
    throw new BadRequestException("No github service found");
  }

  const token = sign(
    {
      serviceId: github.id,
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
