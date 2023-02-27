import { ReactNode } from 'react'
import { BsGithub, BsGoogle, BsTwitter, BsSpotify, BsFacebook} from 'react-icons/bs'
import { getOauthGithubUrl } from './github'
import { getOauthConnectGoogleUrl } from './google'
import { getOauthConnectTwitterUrl } from './twitter'
import { getOauthConnectSpotifyUrl } from '@/utils/oauth/spotify'
import { getOauthConnectFacebookUrl } from '@/utils/oauth/facebook'

export type MappingOauth = {
  name: string
  url: string
  icon: ReactNode
}

export const mappingOauth: MappingOauth[] = [
  {
    name: 'github',
    url: getOauthGithubUrl(),
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
  {
    name: 'facebook',
    url: getOauthConnectFacebookUrl(),
    icon: <BsFacebook />,
  },
]
