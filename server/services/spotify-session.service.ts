import config from 'config';
import axios from 'axios';
import qs from 'qs';
import Logging from "~/lib/logging";
import {SpotifyOauthToken} from "~/types/spotify";

export const getSpotifyOauthToken = async ({code}: { code: string }): Promise<SpotifyOauthToken> => {
    const rootUrl = 'https://accounts.spotify.com/api/token';
    const SPOTIFY_OAUTH_CLIENT_ID: string = config.get<string>('spotifyConfig.clientId');
    const SPOTIFY_OAUTH_CLIENT_SECRET: string = config.get<string>('spotifyConfig.clientSecret');

    const BasicAuthToken: string = Buffer.from(`${SPOTIFY_OAUTH_CLIENT_ID}:${SPOTIFY_OAUTH_CLIENT_SECRET}`, "utf8").toString(
        "base64"
    );

    const options = {
        code,
        redirect_uri: config.get<string>('spotifyConfig.redirectUri'),
        grant_type: 'authorization_code',
    };
    try {
        const { data } = await axios.post<SpotifyOauthToken>(
            rootUrl,
            qs.stringify(options),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${BasicAuthToken}`,
                },
            }
        );
        return data;
    } catch (err: any) {
        Logging.error('Failed to get Spotify Oauth Token');
        throw new Error(err);
    }
};