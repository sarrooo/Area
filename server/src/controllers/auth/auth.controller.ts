import {NextFunction, Request, Response} from "express";
import {BadRequestException} from "~/utils/exceptions";
import {getGoogleOauthToken, getGoogleUser} from "~~/services/google-session.service";
import Logging from "~/lib/logging";
import {prisma} from "~/lib/prisma";
import {sign} from "jsonwebtoken";
import config from "config";
import {getGithubOauthToken, getGithubUser} from "~~/services/github-session.service";
import {getTwitterOauthToken, getTwitterUser} from "~~/services/twitter-session.service";
import {User} from "@prisma/client";

export const generateToken = async (user: User, res: Response): Promise<string> => {

    const refreshToken = sign({ id: user.id, first_name: user.first_name, last_name: user.last_name}, process.env.JWT_REFRESH_SECRET as string, {expiresIn: process.env.JWT_EXPIRES_IN_REFRESH_SECRET});
    res.cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: 'none', maxAge: 1000 * 60 * 60 * 24 * 7, secure: false});

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7);
    await prisma.token.upsert({
        where: {
            userId: user.id,
        },
        update: {
            token: refreshToken,
            expiredAt: expiredAt
        },
        create: {
            userId: user.id,
            token: refreshToken,
            expiredAt: expiredAt
        }
    })

    const token = sign({ id: user.id, first_name: user.first_name, last_name: user.last_name}, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN_SECRET });
    res.cookie('token', token, {httpOnly: false, sameSite: 'none', maxAge: 1000 * 60, secure: false});

    return token;
}

//TODO: Refacto the duplicata code
export const googleOAuthHandler = async (req: Request, res: Response, next: NextFunction) => {
    const code = req.query.code as string;
    const pathUrl = (req.query.state as string) || '/';

    if (!code) {
        Logging.warning("Google OAuth: No code provided");
        throw new BadRequestException('No code provided');
    }

    const { id_token, access_token } = await getGoogleOauthToken({code});

    const { id, given_name, family_name, verified_email } = await getGoogleUser({
        id_token,
    access_token,
    });

    if (!verified_email) {
        Logging.warning("Google OAuth: Email not verified");
        throw new BadRequestException('Google Email not verified');
    }

    const user = await prisma.user.upsert({
        where: {
            google_id: id,
        },
        update: {
            first_name: given_name,
            last_name: family_name,
            provider: 'google',
            google_id: id,
        },
        create: {
            first_name: given_name,
            last_name: family_name,
            provider: 'google',
            google_id: id,
        }
    })

    if (!user) {
        Logging.warning("Google OAuth: Failed to upsert user");
        throw new BadRequestException("Google OAuth: Failed to upsert user");
    }

    await generateToken(user, res);
    Logging.info(`User ${user.first_name} logged in w/ google`);
    res.redirect(`${config.get<string>('frontUrl')}${pathUrl}`)
}

export const githubOAuthHandler = async (req: Request, res: Response, next: NextFunction) => {
    const code = req.query.code as string;
    const pathUrl = (req.query.state as string) || '/';

    if (!code) {
        Logging.warning("Github OAuth: No code provided");
        throw new BadRequestException('No code provided');
    }

    const { access_token } = await getGithubOauthToken({code});
    if (!access_token) {
        Logging.error("Github OAuth: getGithubOauthToken failed");
        throw new BadRequestException('No access_token provided');
    }
    const { id, name } = await getGithubUser(access_token);

    const names: string[] = name.split(" ", 2);
    const first_name: string = names[0];
    const last_name: string = names[1] || "";

    const user = await prisma.user.upsert({
        where: {
            github_id: id.toString(),
        },
        update: {
            first_name: first_name,
            last_name: last_name,
            provider: 'github',
            github_id: id.toString(),
        },
        create: {
            first_name: first_name,
            last_name: last_name,
            provider: 'github',
            github_id: id.toString(),
        }
    })

    await generateToken(user, res);
    Logging.info(`User ${user.first_name} logged in w/ github`);
    res.redirect(`${config.get<string>('frontUrl')}${pathUrl}`)
}

export const twitterOAuthHandler = async (req: Request, res: Response, next: NextFunction) => {
    const code = req.query.code as string;
    const pathUrl = (req.query.state as string) || '/';

    if (!code) {
        Logging.warning("Twitter OAuth: No code provided");
        throw new BadRequestException('No code provided');
    }

    const { access_token } = await getTwitterOauthToken({code});

    if (!access_token) {
        Logging.error("Twitter OAuth: getTwitterhubOauthToken failed");
        throw new BadRequestException('No access_token provided');
    }

    const { id, name } = await getTwitterUser(access_token);

    const names: string[] = name.split(" ", 2);
    const first_name: string = names[0];
    const last_name: string = names[1] || "";

    const user = await prisma.user.upsert({
        where: {
            twitter_id: id,
        },
        update: {
            first_name: first_name,
            last_name: last_name,
            provider: 'twitter',
            twitter_id: id,
        },
        create: {
            first_name: first_name,
            last_name: last_name,
            provider: 'twitter',
            twitter_id: id,
        }
    })

    await generateToken(user, res);
    Logging.info(`User ${user.first_name} logged in w/ Twitter`);
    res.redirect(`${config.get<string>('frontUrl')}${pathUrl}`)
}