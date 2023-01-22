import config from 'config';
import axios from 'axios';
import qs from 'qs';
import Logging from "~/lib/logging";
import {TwitterOauthToken, TwitterUserResult} from "~/types/twitter";

export const getTwitterOauthToken = async ({code}: { code: string }): Promise<TwitterOauthToken> => {
    const rootUrl = 'https://api.twitter.com/2/oauth2/token';
    const TWITTER_OAUTH_CLIENT_ID = config.get<string>('twitterConfig.clientId');
    const TWITTER_OAUTH_CLIENT_SECRET = config.get<string>('twitterConfig.clientSecret');
    const TWITTER_OAUTH_REDIRECT_URL = config.get<string>('twitterConfig.redirectUri');

    const BasicAuthToken = Buffer.from(`${TWITTER_OAUTH_CLIENT_ID}:${TWITTER_OAUTH_CLIENT_SECRET}`, "utf8").toString(
        "base64"
    );

    const options = {
        client_id: TWITTER_OAUTH_CLIENT_ID,
        code_verifier: "challenge",
        redirect_uri: TWITTER_OAUTH_REDIRECT_URL,
        grant_type: 'authorization_code',
        code,
    };
    try {
        const { data } = await axios.post<TwitterOauthToken>(
            rootUrl,
            qs.stringify(options),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${BasicAuthToken}`,
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
    Logging.info('Token: ' + access_token);
    try {
        const { data } = await axios.get<TwitterUserResult>(
            `https://api.twitter.com/1.1/account/verify_credentials.json`,
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        return data;
    } catch (err: any) {
        Logging.error('Failed to get Twitter User' + err);
        throw new Error(err);
    }
}