import { NextFunction, Request, Response } from "express";
import Logging from "~/lib/logging";
import {BadRequestException, ForbiddenRequestException, UnauthorizedRequestException} from "~/utils/exceptions";
import {prisma} from "~/lib/prisma";
import {verify} from "jsonwebtoken";
import {getFacebookOauthToken} from "~~/services/facebook-session.service";

export const facebookConnectHandler = async (
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
        Logging.error("Facebook OAuth: No code provided");
        throw new BadRequestException("No code provided");
    }

    const { access_token } = await getFacebookOauthToken({ code });
    if (!access_token) {
        Logging.error("Facebook OAuth: getFacebookOauthToken failed");
        throw new BadRequestException("No access_token provided");
    }

    const facebook = await prisma.service.findUnique({
        where: {
            name: "facebook"
        }
    });
    if (!facebook) {
        Logging.error("Facebook OAuth: No facebook service found");
        throw new BadRequestException("No facebook service found");
    }

    await prisma.userService.upsert({
        where: {
            userId_serviceId: {
                userId: payload.id,
                serviceId: facebook.id
            }
        },
        update: {
            RefreshToken: access_token
        },
        create: {
            userId: payload.id,
            serviceId: facebook.id,
            RefreshToken: access_token
        }
    });

    res.redirect(
        `${process.env.CORS_FRONT_URL}/oauth_callback`
    );
};
