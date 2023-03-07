import { NextFunction, Request, Response } from "express";
import Logging from "~/lib/logging";
import {
  BadRequestException,
  ForbiddenRequestException,
  UnauthorizedRequestException,
} from "~/utils/exceptions";
import { getSpotifyOauthToken } from "~~/services/spotify-session.service";
import { prisma } from "~/lib/prisma";
import { sign, verify } from "jsonwebtoken";
import { getRedirectUri } from "../../utils/req";

export const spotifyConnectHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const platform = (req.query.platform as string) || "web";

  const code = req.query.code as string;
  if (!code) {
    Logging.error("Spotify OAuth: No code provided");
    throw new BadRequestException("No code provided");
  }

  const { access_token } = await getSpotifyOauthToken({ code, redirect_uri: getRedirectUri(req) });
  if (!access_token) {
    Logging.error("Spotify OAuth: getSpotifyOauthToken failed");
    throw new BadRequestException("No access_token provided");
  }

  const spotify = await prisma.service.findUnique({
    where: {
      name: "spotify",
    },
  });
  if (!spotify) {
    Logging.error("Spotify OAuth: No spotify service found");
    throw new BadRequestException("No spotify service found");
  }

  const token = sign(
    {
      serviceId: spotify.id,
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
