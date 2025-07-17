import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { trpc } from '../../lib/trpc'
import { getLoginRoute } from '../../lib/routes'

export const LogoutPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()

  useEffect(() => {
    Cookies.remove('token')
    trpcUtils.invalidate().then(() => {
      navigate(getLoginRoute())
    })
  }, [])

  return <p>Loading...</p>
}
