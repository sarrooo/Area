import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconEntypo from 'react-native-vector-icons/Entypo'
import React from 'react'
import {getOauthConnectGithubUrl, getOauthGithubUrl} from './github'
import {getOauthConnectGoogleUrl, getOauthGoogleUrl} from './google'
import {getOauthConnectTwitterUrl, getOauthTwitterUrl} from './twitter'
import {getOauthConnectSpotifyUrl} from './spotify'
import {getOauthConnectFacebookUrl} from './facebook'

export type MappingOauth = {
  name: string
  url?: string
  urlConnect: string
  icon: React.ReactElement
}

export const mappingOauth: MappingOauth[] = [
  {
    name: 'github',
    url: getOauthGithubUrl(),
    urlConnect: getOauthConnectGithubUrl(),
    icon: <IconAntDesign name="github" size={24} />,
  },
  {
    name: 'twitter',
    url: getOauthTwitterUrl(),
    urlConnect: getOauthConnectTwitterUrl(),
    icon: <IconAntDesign name="twitter" size={24} />,
  },
  {
    name: 'google',
    url: getOauthGoogleUrl(),
    urlConnect: getOauthConnectGoogleUrl(),
    icon: <IconAntDesign name="google" size={24} />,
  },
  {
    name: 'spotify',
    urlConnect: getOauthConnectSpotifyUrl(),
    icon: <IconEntypo name="spotify" size={24} />,
  },
  {
    name: 'facebook',
    urlConnect: getOauthConnectFacebookUrl(),
    icon: <IconEntypo name="facebook" size={24} />,
  },
]
