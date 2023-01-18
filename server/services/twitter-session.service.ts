import config from 'config';
import axios from 'axios';
import qs from 'qs';
import Logging from "~/lib/logging";
import {TwitterOauthToken, TwitterUserResult} from "~/types/twitter";
import * as console from "console";

export const getTwitterOauthToken = async ({code}: { code: string }): Promise<TwitterOauthToken> => {
    const rootUrl = 'https://api.twitter.com/2/oauth2/token?';
    const API_KEY = config.get<string>('twitterConfig.clientId');
    const API_SECRET = config.get<string>('twitterConfig.clientSecret');

    const options = {
        code,
        client_id: config.get<string>('twitterConfig.clientId'),
        redirect_uri: config.get<string>('twitterConfig.redirectUri'),
        grant_type: 'authorization_code',
        code_verifier: 'challenge',
    };
    console.log(rootUrl + qs.stringify(options));
    try {
        const { data } = await axios.post<TwitterOauthToken>(
            rootUrl,
            qs.stringify(options),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return data;
    } catch (err: any) {
        Logging.error('Failed to get Twitter Oauth Token');
        throw new Error(err);
    }
};

export async function getTwitterUser(access_token : string): Promise<TwitterUserResult> {
    try {
        const { data } = await axios.get<TwitterUserResult>(
            `https://api.twitter.com/1.1/account/verify_credentials.json`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        return data;
    } catch (err: any) {
        Logging.error('Failed to get Twitter User');
        throw new Error(err);
    }
}