import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import { ReactComponent as GithubLogo } from '../assets/github.svg';
import { ReactComponent as TwitterLogo } from '../assets/twitter.svg';
import { getGoogleUrl } from '../utils/getGoogleUrl';
import {getGithubUrl} from "../utils/getGithubUrl";
import {getTwitterUrl} from "../utils/getTwitterUrl";

const LoginPage = () => {
    const location = useLocation();
    let from = ((location.state as any)?.from?.pathname as string) || '/';

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#2363eb',
            }}
        >
            <Box width='27rem'>
                <Typography
                    variant='h6'
                    component='p'
                    sx={{
                        my: '1.5rem',
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    Log in with Google provider:
                </Typography>
                <Box
                    width='100%'
                    sx={{
                        backgroundColor: '#e5e7eb',
                        p: { xs: '1rem', sm: '2rem' },
                        borderRadius: 2,
                    }}
                >
                    <MuiLink
                        href={getGoogleUrl(from)}
                        sx={{
                            backgroundColor: '#f5f6f7',
                            borderRadius: 1,
                            py: '0.6rem',
                            columnGap: '1rem',
                            textDecoration: 'none',
                            color: '#393e45',
                            cursor: 'pointer',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#fff',
                                boxShadow: '0 1px 13px 0 rgb(0 0 0 / 15%)',
                            },
                        }}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <GoogleLogo style={{ height: '2rem' }} />
                        Google
                    </MuiLink>
                </Box>
            </Box>
            <Box width='27rem'>
                <Typography
                    variant='h6'
                    component='p'
                    sx={{
                        my: '1.5rem',
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    Log in with Github provider:
                </Typography>
                <Box
                    width='100%'
                    sx={{
                        backgroundColor: '#e5e7eb',
                        p: { xs: '1rem', sm: '2rem' },
                        borderRadius: 2,
                    }}
                >
                    <MuiLink
                        href={getGithubUrl(from)}
                        sx={{
                            backgroundColor: '#f5f6f7',
                            borderRadius: 1,
                            py: '0.6rem',
                            columnGap: '1rem',
                            textDecoration: 'none',
                            color: '#393e45',
                            cursor: 'pointer',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#fff',
                                boxShadow: '0 1px 13px 0 rgb(0 0 0 / 15%)',
                            },
                        }}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <GithubLogo style={{ height: '2rem' }} />
                        Github
                    </MuiLink>
                </Box>
            </Box>
            <Box width='27rem'>
                <Typography
                    variant='h6'
                    component='p'
                    sx={{
                        my: '1.5rem',
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    Log in with Twitter provider:
                </Typography>
                <Box
                    width='100%'
                    sx={{
                        backgroundColor: '#e5e7eb',
                        p: { xs: '1rem', sm: '2rem' },
                        borderRadius: 2,
                    }}
                >
                    <MuiLink
                        href={getTwitterUrl(from)}
                        sx={{
                            backgroundColor: '#f5f6f7',
                            borderRadius: 1,
                            py: '0.6rem',
                            columnGap: '1rem',
                            textDecoration: 'none',
                            color: '#393e45',
                            cursor: 'pointer',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#fff',
                                boxShadow: '0 1px 13px 0 rgb(0 0 0 / 15%)',
                            },
                        }}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <TwitterLogo style={{ height: '2rem' }} />
                        Twitter
                    </MuiLink>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;

