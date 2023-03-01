import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconEntypo from 'react-native-vector-icons/Entypo'
import React from 'react'
import {getOauthGithubUrl} from './github'
import {getOauthConnectGoogleUrl} from './google'
import {getOauthConnectTwitterUrl} from './twitter'
import {getOauthConnectSpotifyUrl} from './spotify'
import {getOauthConnectFacebookUrl} from './facebook'

export type MappingOauth = {
  name: string
  url: string
  icon: React.ReactElement
}

export const mappingOauth: MappingOauth[] = [
  {
    name: 'github',
    url: getOauthGithubUrl(),
    icon: <IconAntDesign name="github" size={24} />,
  },
  {
    name: 'twitter',
    url: getOauthConnectTwitterUrl(),
    icon: <IconAntDesign name="twitter" size={24} />,
  },
  {
    name: 'google',
    url: getOauthConnectGoogleUrl(),
    icon: <IconAntDesign name="google" size={24} />,
  },
  {
    name: 'spotify',
    url: getOauthConnectSpotifyUrl(),
    icon: <IconEntypo name="spotify" size={24} />,
  },
  {
    name: 'facebook',
    url: getOauthConnectFacebookUrl(),
    icon: <IconEntypo name="facebook" size={24} />,
  },
]
