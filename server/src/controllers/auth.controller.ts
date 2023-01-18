import {NextFunction, Request, Response} from "express";
import {BadRequestException} from "~/utils/exceptions";
import {getGoogleOauthToken, getGoogleUser} from "~~/services/google-session.service";
import Logging from "~/lib/logging";
import {prisma} from "~/lib/prisma";
import {sign} from "jsonwebtoken";
import config from "config";
import {getGithubOauthToken, getGithubUser} from "~~/services/github-session.service";
import * as console from "console";

export const googleOAuthHandler = async (req: Request, res: Response, next: NextFunction) => {
    const code = req.query.code as string;
    const pathUrl = (req.query.state as string) || '/';

    if (!code) {
        Logging.warning("Google OAuth: No code provided");
        throw new BadRequestException('No code provided');
    }

    const { id_token, access_token } = await getGoogleOauthToken({code});

    const { given_name, family_name, email, verified_email } = await getGoogleUser({
        id_token,
    access_token,
    });

    if (!verified_email) {
        Logging.warning("Google OAuth: Email not verified");
        throw new BadRequestException('Google Email not verified');
    }

    const user = await prisma.user.upsert({
        where: {
            email: email
        },
        update: {
            first_name: given_name,
            last_name: family_name,
            email: email,
            provider: 'google',
        },
        create: {
            first_name: given_name,
            last_name: family_name,
            email: email,
            provider: 'google',
        }
    })

    if (!user) {
        Logging.warning("Google OAuth: Failed to upsert user");
        throw new BadRequestException("Google OAuth: Failed to upsert user");
    }

    const refreshToken = sign({ id: user.id,  email: user.email}, process.env.JWT_REFRESH_SECRET as string, {expiresIn: process.env.JWT_EXPIRES_IN_REFRESH_SECRET});
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

    const token = sign({ id: user.id, name: user.email }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN_SECRET });
    res.cookie('token', token, {httpOnly: false, sameSite: 'none', maxAge: 1000 * 60, secure: false});
    Logging.info(`User ${user.email} logged in w/ google`);
    res.redirect(`${config.get<string>('frontUrl')}${pathUrl}`)
}

export const githubOAuthHandler = async (req: Request, res: Response, next: NextFunction) => {

    const code = req.query.code as string;
    Logging.info(`Github OAuth: ${code}`);

    if (!code) {
        Logging.warning("Github OAuth: No code provided");
        throw new BadRequestException('No code provided');
    }

    const { access_token } = await getGithubOauthToken({code});
    console.log(access_token);
    if (!access_token) {
        Logging.error("Github OAuth: getGithubOauthToken failed");
        throw new BadRequestException('No access_token provided');
    }
    const { name, email } = await getGithubUser(access_token);

    res.status(200).json({name, email})
}

export const twitterOAuthHandler = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send('twitter')
}