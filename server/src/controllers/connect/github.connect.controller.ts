import { Request, Response } from "express";
import Logging from "~/lib/logging";
import {BadRequestException, ForbiddenRequestException, UnauthorizedRequestException} from "~/utils/exceptions";
import {prisma} from "~/lib/prisma";
import {verify} from "jsonwebtoken";
import {getGithubOauthToken} from "~~/services/github-session.service";

export const githubConnectHandler = async (
    req: Request,
    res: Response,
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
            name: "github"
        }
    });
    if (!github) {
        Logging.error("Github Connect OAuth: No github service found");
        throw new BadRequestException("No github service found");
    }

    await prisma.userService.upsert({
        where: {
            userId_serviceId: {
                userId: payload.id,
                serviceId: github.id
            }
        },
        update: {
            RefreshToken: access_token
        },
        create: {
            userId: payload.id,
            serviceId: github.id,
            RefreshToken: access_token
        }
    });

    res.redirect(
        `${process.env.CORS_FRONT_URL}/oauth_callback`
    );
};
