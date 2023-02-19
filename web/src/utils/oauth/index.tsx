import { ReactNode } from 'react'
import { BsGithub, BsGoogle, BsTwitter } from 'react-icons/bs'
import { getOauthGithubUrl } from './github'
import { getOauthGoogleUrl } from './google'
import { getOauthTwitterUrl } from './twitter'

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
    url: getOauthTwitterUrl(),
    icon: <BsTwitter />,
  },
  {
    name: 'google',
    url: getOauthGoogleUrl(),
    icon: <BsGoogle />,
  },
]
