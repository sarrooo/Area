import {Platform} from 'react-native'

export const getDeepLink = (path = '') => {
  const scheme = 'trirea'
  const prefix =
    Platform.OS === 'android' ? `${scheme}://com.mobile/` : `${scheme}://`
  return prefix + path
}
