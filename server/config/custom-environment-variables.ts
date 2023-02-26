export default {
    port: 'PORT',
    frontUrl: 'CORS_FRONT_URL',
    jwtConfig: {
        secret: 'JWT_SECRET',
        refreshSecret: 'JWT_REFRESH_SECRET',
        expiresInSecret: 'JWT_EXPIRES_IN_SECRET',
        expiresInRefreshSecret: 'JWT_EXPIRES_IN_REFRESH_SECRET',
    },
    postgresConfig: {
        host: 'POSTGRES_HOST',
        port: 'POSTGRES_PORT',
        username: 'POSTGRES_USER',
        password: 'POSTGRES_PASSWORD',
        database: 'POSTGRES_DB'
    },
    googleConfig: {
        clientId: 'GOOGLE_OAUTH_CLIENT_ID',
        clientSecret: 'GOOGLE_OAUTH_CLIENT_SECRET',
        redirectUri: 'GOOGLE_OAUTH_REDIRECT_URL',
        redirectConnectUri: 'GOOGLE_OAUTH_CONNECT_REDIRECT_URL',
    },
    githubConfig: {
        clientId: 'GITHUB_OAUTH_CLIENT_ID',
        clientSecret: 'GITHUB_OAUTH_CLIENT_SECRET',
        redirectUri: 'GITHUB_OAUTH_REDIRECT_URL',
    },
    twitterConfig: {
        clientId: 'TWITTER_OAUTH_CLIENT_ID',
        clientSecret: 'TWITTER_OAUTH_CLIENT_SECRET',
        redirectUri: 'TWITTER_OAUTH_REDIRECT_URL',
        redirectConnectUri: 'TWITTER_OAUTH_CONNECT_REDIRECT_URL',
    },
    spotifyConfig: {
        clientId: 'SPOTIFY_OAUTH_CLIENT_ID',
        clientSecret: 'SPOTIFY_OAUTH_CLIENT_SECRET',
        redirectUri: 'SPOTIFY_OAUTH_REDIRECT_URL',
    }
}