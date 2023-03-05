import config from 'config';
import axios from 'axios';
import qs from 'qs';
import Logging from "~/lib/logging";
import {FacebookOauthToken} from "~/types/facebook";

export const getFacebookOauthToken = async ({code}: { code: string }): Promise<FacebookOauthToken> => {
    const rootUrl = 'https://graph.facebook.com/v16.0/oauth/access_token';

    const options = {
        code,
        client_id: config.get<string>('facebookConfig.clientId'),
        client_secret: config.get<string>('facebookConfig.clientSecret'),
        redirect_uri: config.get<string>('facebookConfig.redirectUri'),
    };
    try {
        const { data } = await axios.post<FacebookOauthToken>(
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
        Logging.error('Failed to get Facebook Oauth Token');
        throw new Error(err);
    }
};
