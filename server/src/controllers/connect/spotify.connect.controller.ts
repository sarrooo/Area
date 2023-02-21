import { NextFunction, Request, Response } from "express";
import Logging from "~/lib/logging";
import {BadRequestException, ForbiddenRequestException, UnauthorizedRequestException} from "~/utils/exceptions";
import {getSpotifyOauthToken} from "~~/services/spotify-session.service";
import {prisma} from "~/lib/prisma";
import {verify} from "jsonwebtoken";

export const spotifyConnectHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
                userId: payload.id,
                serviceId: spotify.id
            }
        },
        update: {
            RefreshToken: access_token
        },
        create: {
            userId: payload.id,
            serviceId: spotify.id,
            RefreshToken: access_token
        }
    });

    res.redirect(
        `${process.env.CORS_FRONT_URL}/oauth_callback`
    );
};
