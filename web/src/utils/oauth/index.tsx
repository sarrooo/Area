import { ReactNode } from 'react'
import { BsGithub, BsGoogle, BsTwitter, BsSpotify } from 'react-icons/bs'
import { getOauthConnectGithubUrl } from './github'
import { getOauthConnectGoogleUrl } from './google'
import { getOauthConnectTwitterUrl } from './twitter'
import { getOauthConnectSpotifyUrl } from '@/utils/oauth/spotify'

export type MappingOauth = {
  name: string
  url: string
  icon: ReactNode
}

export const mappingOauth: MappingOauth[] = [
  {
    name: 'github',
    url: getOauthConnectGithubUrl(),
    icon: <BsGithub />,
  },
  {
    name: 'twitter',
    url: getOauthConnectTwitterUrl(),
    icon: <BsTwitter />,
  },
  {
    name: 'google',
    url: getOauthConnectGoogleUrl(),
    icon: <BsGoogle />,
  },
  {
    name: 'spotify',
    url: getOauthConnectSpotifyUrl(),
    icon: <BsSpotify />,
  },
]
