import { NextFunction, Request, Response } from "express";
import Logging from "~/lib/logging";
import { BadRequestException } from "~/utils/exceptions";
import {getSpotifyOauthToken} from "~~/services/spotify-session.service";
import {prisma} from "~/lib/prisma";

export const spotifyConnectHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user || !req.user.id) {
        Logging.error("Spotify OAuth: No user provided");
        throw new BadRequestException("No user provided");
    }

    const code = req.query.code as string;

    if (!code) {
        Logging.error("Spotify OAuth: No code provided");
        throw new BadRequestException("No code provided");
    }

    const { access_token } = await getSpotifyOauthToken({ code });
    if (!access_token) {
        Logging.error("Spotify OAuth: getSpotifyOauthToken failed");
        throw new BadRequestException("No access_token provided");
    }

    const spotify = await prisma.service.findUnique({
        where: {
            name: "spotify"
        }
    });
    if (!spotify) {
        Logging.error("Spotify OAuth: No spotify service found");
        throw new BadRequestException("No spotify service found");
    }

    await prisma.userService.upsert({
        where: {
            userId_serviceId: {
                userId: req.user.id,
                serviceId: spotify.id
            }
        },
        update: {
            RefreshToken: access_token
        },
        create: {
            userId: req.user.id,
            serviceId: spotify.id,
            RefreshToken: access_token
        }
    });

    res.redirect(
        `${process.env.CORS_FRONT_URL}/oauth_callback`
    );
};
