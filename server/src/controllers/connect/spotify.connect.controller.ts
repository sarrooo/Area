import { NextFunction, Request, Response } from "express";
import Logging from "~/lib/logging";
import { BadRequestException } from "~/utils/exceptions";
import {getSpotifyOauthToken} from "~~/services/spotify-session.service";

export const spotifyConnectHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const code = req.query.code as string;
    const pathUrl = (req.query.state as string) || "/";

    if (!code) {
        Logging.warning("Spotify OAuth: No code provided");
        throw new BadRequestException("No code provided");
    }

    const { access_token } = await getSpotifyOauthToken({ code });
};
