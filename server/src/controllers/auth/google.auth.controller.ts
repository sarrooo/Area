//TODO: Refacto the duplicata code
import {NextFunction, Request, Response} from "express";
import Logging from "~/lib/logging";
import {BadRequestException} from "~/utils/exceptions";
import {getGoogleOauthToken, getGoogleUser} from "~~/services/google-session.service";
import {prisma} from "~/lib/prisma";
import config from "config";
import {generateToken} from "~/controllers/auth/auth.controller";

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