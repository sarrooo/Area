import config from 'config';
import axios, { AxiosError } from 'axios';
import qs from 'qs';
import {GoogleOauthToken, GoogleUserResult} from "~/types/google";
import Logging from "~/lib/logging";

export const getGoogleOauthToken = async ({code, redirect_uri}: { code: string, redirect_uri: string }): Promise<GoogleOauthToken> => {
    const rootUrl = 'https://oauth2.googleapis.com/token';

    const options = {
        code,
        client_id: config.get<string>('googleConfig.clientId'),
        client_secret: config.get<string>('googleConfig.clientSecret'),
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
    };
    try {
        const { data } = await axios.post<GoogleOauthToken>(
            rootUrl,
            qs.stringify(options),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        return data;
    } catch (err: any) {
        console.log('err', (err as AxiosError).request)
        Logging.error('Failed to get Google Oauth Token');
        throw new Error(err);
    }
};

export async function getGoogleUser({
    id_token,
    access_token,}: {
    id_token: string;
    access_token: string;
}): Promise<GoogleUserResult> {
    try {
        const { data } = await axios.get<GoogleUserResult>(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        );

        return data;
    } catch (err: any) {
        Logging.error('Failed to get Google User');
        throw new Error(err);
    }
}

export const getGoogleConnectOauthToken = async ({code, redirect_uri}: { code: string, redirect_uri: string }): Promise<GoogleOauthToken> => {
    const rootUrl = 'https://oauth2.googleapis.com/token';

    const options = {
        code,
        client_id: config.get<string>('googleConfig.clientId'),
        client_secret: config.get<string>('googleConfig.clientSecret'),
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
    };
    try {
        const { data } = await axios.post<GoogleOauthToken>(
            rootUrl,
            qs.stringify(options),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        return data;
    } catch (err: any) {
        Logging.error('Failed to get Google Oauth Token');
        throw new Error(err);
    }
};
