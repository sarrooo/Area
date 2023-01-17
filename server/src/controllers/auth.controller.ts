import {NextFunction, Request, Response} from "express";
import {BadRequestException} from "~/utils/exceptions";
import {getGoogleOauthToken, getGoogleUser} from "~~/services/google-session.service";
import Logging from "~/lib/logging";
import {HttpStatusCode} from "axios";

export const googleOAuthHandler = async (req: Request, res: Response, next: NextFunction) => {
    const code = req.query.code as string;

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

    Logging.info('Google user' + { given_name, family_name, email, verified_email });
    return res.status(HttpStatusCode.Accepted).json({ given_name, family_name, email, verified_email });
}