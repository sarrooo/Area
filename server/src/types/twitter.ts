export interface TwitterOauthToken {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
}

export interface TwitterUserResult {
    id: string;
    username: string;
}