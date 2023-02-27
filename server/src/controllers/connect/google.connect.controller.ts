import { NextFunction, Request, Response } from "express";
import Logging from "~/lib/logging";
import {BadRequestException, ForbiddenRequestException, UnauthorizedRequestException} from "~/utils/exceptions";
import {prisma} from "~/lib/prisma";
import {verify} from "jsonwebtoken";
import {getGoogleConnectOauthToken} from "~~/services/google-session.service";

export const googleConnectHandler = async (
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
        Logging.error("Google Connect OAuth: No code provided");
        throw new BadRequestException("No code provided");
    }

    const { access_token } = await getGoogleConnectOauthToken({ code });
    if (!access_token) {
        Logging.error("Google Connect OAuth: getGoogleConnectOauthToken failed");
        throw new BadRequestException("No access_token provided");
    }

    const google = await prisma.service.findUnique({
        where: {
            name: "google"
        }
    });
    if (!google) {
        Logging.error("Google Connect OAuth: No google service found");
        throw new BadRequestException("No google service found");
    }

    await prisma.userService.upsert({
        where: {
            userId_serviceId: {
                userId: payload.id,
                serviceId: google.id
            }
        },
        update: {
            RefreshToken: access_token
        },
        create: {
            userId: payload.id,
            serviceId: google.id,
            RefreshToken: access_token
        }
    });

    res.redirect(
        `${process.env.CORS_FRONT_URL}/oauth_callback`
    );
};
