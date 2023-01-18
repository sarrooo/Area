export const getTwitterUrl = (from: string) => {
    const rootUrl = `https://twitter.com/i/oauth2/authorize`;

    const options = {
        redirect_uri: process.env.REACT_APP_TWITTER_OAUTH_REDIRECT as string,
        client_id: process.env.REACT_APP_TWITTER_OAUTH_CLIENT_ID as string,
        state: from,
        response_type: "code",
        code_challenge: "challenge",
        code_challenge_method: "plain",
        scope: "users.read offline.access",
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
};