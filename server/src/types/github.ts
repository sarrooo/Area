export interface GithubOauthToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
    token_type: string;
    scope: string;
}

export interface GithubUserResult {
    id: number;
    email: string;
    name: string;
}