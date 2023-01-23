import config from 'config';
import axios from 'axios';
import qs from 'qs';
import Logging from "~/lib/logging";
import {GithubOauthToken, GithubUserResult} from "~/types/github";

export const getGithubOauthToken = async ({code}: { code: string }): Promise<GithubOauthToken> => {
    const rootUrl: string = 'https://github.com/login/oauth/access_token?';

    const options = {
        code,
        client_id: config.get<string>('githubConfig.clientId'),
        client_secret: config.get<string>('githubConfig.clientSecret'),
        redirect_uri: config.get<string>('githubConfig.redirectUri'),
    };

    try {
        const { data } = await axios.post<GithubOauthToken>(
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
        Logging.error('Failed to get Github Oauth Token');
        throw new Error(err);
    }
};

export async function getGithubUser(access_token : string): Promise<GithubUserResult> {
    try {
        const { data } = await axios.get<GithubUserResult>(
            `https://api.github.com/user?alt`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        return data;
    } catch (err: any) {
        Logging.error('Failed to get Github User');
        throw new Error(err);
    }
}