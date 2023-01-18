export interface TwitterOauthToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
    token_type: string;
    scope: string;
}

export interface TwitterUserResult {
    id: string;
    email: string;
    name: string;
}