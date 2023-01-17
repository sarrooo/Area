import config from 'config';
import axios from 'axios';
import qs from 'qs';
import {GoogleOauthToken} from "~/types/OAuth";
import Logging from "~/lib/logging";

export const getGoogleOauthToken = async ({code}: { code: string }): Promise<GoogleOauthToken> => {
    const rootUrl = 'https://oauth2.googleapis.com/token';

    const options = {
        code,
        client_id: config.get<string>('googleConfig.clientId'),
        client_secret: config.get<string>('googleConfig.clientSecret'),
        redirect_uri: config.get<string>('googleConfig.redirectUri'),
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