import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { login } from '@/redux/features/userSlice'
import { store } from '@/redux/store'
import { useIdentifyMutation } from '@/redux/services/user'

const OauthCallbackSubscribe = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [identify] = useIdentifyMutation()

  useEffect(() => {
    const token = searchParams.get('access_token')
    if (!token) {
      return navigate('/login?error="Oauth failed"')
    }
    store.dispatch(login({ token }))
    identify({ token })
    return navigate('/dashboard')
  }, [])

  return <h1>Loading...</h1>
}

export default OauthCallbackSubscribe
