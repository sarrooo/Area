import config from 'config';
import axios from 'axios';
import qs from 'qs';
import Logging from "~/lib/logging";
import {TwitterOauthToken, TwitterUserResult} from "~/types/twitter";

export const getTwitterOauthToken = async ({code, redirect_uri}: { code: string, redirect_uri: string }): Promise<TwitterOauthToken> => {
    const rootUrl = 'https://api.twitter.com/2/oauth2/token';
    const TWITTER_OAUTH_CLIENT_ID: string = config.get<string>('twitterConfig.clientId');
    const TWITTER_OAUTH_CLIENT_SECRET: string = config.get<string>('twitterConfig.clientSecret');

    const BasicAuthToken: string = Buffer.from(`${TWITTER_OAUTH_CLIENT_ID}:${TWITTER_OAUTH_CLIENT_SECRET}`, "utf8").toString(
        "base64"
    );

    const options = {
        client_id: TWITTER_OAUTH_CLIENT_ID,
        code_verifier: "challenge",
        redirect_uri: redirect_uri,
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
    try {
        const { data } = await axios.get<{data: TwitterUserResult}>(
            `https://api.twitter.com/2/users/me`,
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );


        return data.data;
    } catch (err: any) {
        Logging.error('Failed to get Twitter User' + err);
        throw new Error(err);
    }
}

export const getTwitterConnectOauthToken = async ({code, redirect_uri}: { code: string, redirect_uri: string }): Promise<TwitterOauthToken> => {
    const rootUrl = 'https://api.twitter.com/2/oauth2/token';
    const TWITTER_OAUTH_CLIENT_ID: string = config.get<string>('twitterConfig.clientId');
    const TWITTER_OAUTH_CLIENT_SECRET: string = config.get<string>('twitterConfig.clientSecret');

    const BasicAuthToken: string = Buffer.from(`${TWITTER_OAUTH_CLIENT_ID}:${TWITTER_OAUTH_CLIENT_SECRET}`, "utf8").toString(
        "base64"
    );

    const options = {
        client_id: TWITTER_OAUTH_CLIENT_ID,
        code_verifier: "challenge",
        redirect_uri: redirect_uri,
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
