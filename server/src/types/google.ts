export interface GoogleOauthToken {
    access_token: string;
    id_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    scope: string;
}

export interface GoogleUserResult {
    id: string;
    email: string;
    verified_email: boolean;
    given_name: string;
    family_name: string;
}