import config from 'config';
import axios from 'axios';
import qs from 'qs';
import Logging from "~/lib/logging";
import {TwitterOauthToken, TwitterUserResult} from "~/types/twitter";

export const getTwitterOauthToken = async ({code}: { code: string }): Promise<TwitterOauthToken> => {
    const rootUrl = 'https://github.com/login/oauth/access_token?';

    const options = {
        code,
        client_id: config.get<string>('githubConfig.clientId'),
        client_secret: config.get<string>('githubConfig.clientSecret'),
        redirect_uri: config.get<string>('githubConfig.redirectUri'),
    };

    try {
        const { data } = await axios.post<TwitterOauthToken>(
            rootUrl,
            qs.stringify(options),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
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
            `https://api.github.com/user?alt`,
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